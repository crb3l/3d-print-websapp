import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const Materials = () => {
  const materials = [
    {
      name: 'PLA',
      description: 'Eco-friendly, biodegradable, and easy to print. Ideal for general use and prototyping.',
    },
    {
      name: 'ABS',
      description: 'Durable, heat-resistant, and impact-resistant. Suitable for functional parts and industrial applications.',
    },
    {
      name: 'PETG',
      description: 'Strong, chemical-resistant, and slightly flexible. A great choice for outdoor applications and mechanical parts.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-6">Materials</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl">
        Learn more about the different materials we offer for 3D printing and their best use cases.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <Card key={material.name}>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
              <p className="text-slate-600">{material.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;