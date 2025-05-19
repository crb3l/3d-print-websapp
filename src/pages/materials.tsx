// import React from 'react';
// import { Card, CardContent } from '../components/ui/card';

// const Materials = () => {
//   const materials = [
//     {
//       name: 'PLA',
//       description: 'Eco-friendly, biodegradable, and easy to print. Ideal for general use and prototyping.',
//     },
//     {
//       name: 'ABS',
//       description: 'Durable, heat-resistant, and impact-resistant. Suitable for functional parts and industrial applications.',
//     },
//     {
//       name: 'PETG',
//       description: 'Strong, chemical-resistant, and slightly flexible. A great choice for outdoor applications and mechanical parts.',
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-20">
//       <h1 className="text-5xl font-bold mb-6">Materials</h1>
//       <p className="text-xl text-slate-600 mb-3">
//         Learn more about the different materials we offer for 3D printing using Fused Deposition Modeling (FDM).</p>
//       <p className="text-xl text-slate-600 mb-8">Fused Deposition Modeling (FDM) is the most common 3D printing technology, where objects are built layer by layer using thermoplastic filaments. It’s cost-effective, versatile, and ideal for prototyping, functional parts, and custom objects in a wide range of materials.</p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {materials.map((material) => (
//           <Card key={material.name}>
//             <CardContent className="pt-6">
//               <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
//               <p className="text-slate-600">{material.description}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Materials;
import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';

const Materials = () => {
  const materials = [
    {
      name: 'PLA',
      description: 'Eco-friendly, biodegradable, and easy to print. Ideal for general use and prototyping.',
      details: 'Polylactic acid (PLA) is a thermoplastic aliphatic polyester derived from renewable resources, such as corn starch, tapioca roots, chips or sugarcane. It is one of the most popular materials for FDM 3D printing due to its ease of use, low printing temperature, and minimal warping.',
      properties: [
        'Easy to print',
        'Biodegradable',
        'Low warping',
        'Good for detailed prints',
      ],
      applications: [
        'Prototyping',
        'Educational models',
        'Decorative items',
        'Simple tools',
      ],
    },
    {
      name: 'ABS',
      description: 'Durable, heat-resistant, and impact-resistant. Suitable for functional parts and industrial applications.',
      details: 'Acrylonitrile Butadiene Styrene (ABS) is a common thermoplastic polymer known for its strength, toughness, and resistance to heat and chemicals. It requires a heated bed for printing to prevent warping and may emit fumes, so good ventilation is recommended.',
      properties: [
        'High strength and toughness',
        'Heat resistant',
        'Impact resistant',
        'Good for functional parts',
      ],
      applications: [
        'Mechanical parts',
        'Automotive components',
        'Protective cases',
        'Toys',
      ],
    },
    {
      name: 'PETG',
      description: 'Strong, chemical-resistant, and slightly flexible. A great choice for outdoor applications and mechanical parts.',
      details: 'Polyethylene Terephthalate Glycol-modified (PETG) is a glycol-modified version of PET, making it less brittle and easier to print. It offers a good balance of strength, flexibility, and chemical resistance, and is known for its good layer adhesion.',
      properties: [
        'Strong and durable',
        'Chemical resistant',
        'Slightly flexible',
        'Good layer adhesion',
      ],
      applications: [
        'Functional prototypes',
        'Robotics parts',
        'Containers for liquids',
        'Outdoor equipment',
      ],
    },
  ];

  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (name: string) => {
    setExpandedCard(expandedCard === name ? null : name);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-6">Materials</h1>
      <p className="text-xl text-slate-600 mb-3">
        Learn more about the different materials we offer for 3D printing using Fused Deposition Modeling (FDM).
      </p>
      <p className="text-xl text-slate-600 mb-8">
        Fused Deposition Modeling (FDM) is the most common 3D printing technology, where objects are built layer by layer using thermoplastic filaments. It’s cost-effective, versatile, and ideal for prototyping, functional parts, and custom objects in a wide range of materials.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <div key={material.name} className={`${expandedCard === material.name ? 'col-span-full' : ''}`}>
            <Card onClick={() => handleCardClick(material.name)} className={`cursor-pointer transition-all duration-300 ${expandedCard === material.name ? 'shadow-xl z-10' : 'shadow-md'}`}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
                <p className="text-slate-600">{material.description}</p>
                {expandedCard !== material.name && (
                  <div className="absolute top-2 right-2 mr-2 text-sm text-slate-400 italic">
                    click to expand
                  </div>
                )}
                {expandedCard === material.name && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Details:</h4>
                    <p className="text-slate-700 mb-3">{material.details}</p>
                    <h4 className="text-lg font-semibold mb-2">Key Properties:</h4>
                    <ul className="list-disc list-inside text-slate-700 mb-3">
                      {material.properties.map((property) => (
                        <li key={property}>{property}</li>
                      ))}
                    </ul>
                    <h4 className="text-lg font-semibold mb-2">Typical Applications:</h4>
                    <ul className="list-disc list-inside text-slate-700">
                      {material.applications.map((application) => (
                        <li key={application}>{application}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;