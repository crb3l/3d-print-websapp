import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Printer, Package, Clock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="center flex-grow flex flex-col ">
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-slate-100 to-white py-20 items-center justify-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            Manufacturing made simple.
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl">
            Upload your 3D model, customize your print settings, and receive high-quality
            prints delivered at your doorstep.
          </p>
          <Link to="/print">
            <Button variant="default" size="lg" className="gap-2">
              Start Your Print <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            Why us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Printer className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    Quality Prints
                  </h3>
                  <p className="text-slate-600">
                    Top-notch printers and premium materials for the best results.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    3D Visualizer
                  </h3>
                  <p className="text-slate-600">
                    Have a last look at the model you're about to print.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-slate-600">
                    Expert assistance available around the clock for your projects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* services section*/}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="">
              <img src="/printing.gif" alt="Image 1" className="w-full h-96 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">Printing on demand</h3>
              <p className="text-slate-600">Printing on demand has never been easier with the help of our 3D visualizer.</p>
            </div>

            {/* Image 2 */}
            <div className="">
              <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2J2Mm55dW96MWVocGhzeGx1dGJ0bmY1NHgwcHkzZWplM29ybjQ3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jn2PxavzGxa3Ncb1EQ/giphy.gif" alt="Image 2" className="w-full h-96 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">Prototyping</h3>
              <p className="text-slate-600">If you have a specific item you need, please don't hesitate to contact us.</p>
            </div>

            {/* Image 3 */}
            <div className="max-auto">
              <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJydWNpdGtsYjduaDdrNWZ5d3Y5aWV0aHAzNm42ZnJnZDNhNTNkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Zt4j96fDG4XzO0w/giphy.gif" alt="Image 3" className="w-full h-96 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">Printed Items Store - COMING SOON!11!!1!</h3>
              <p className="text-slate-600">Take a look inside our store filled with printed items. Surely something will catch your eye ;).</p>
            </div>

          </div>
        </div>
      </section>


      {/* Materials Section */}
      <section className=" pt-20 pb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            Available Materials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: 'https://www.3dnatives.com/en/wp-content/uploads/sites/2/Article_PLA_Cover.jpg', name: 'PLA [Polylactic Acid]', desc: 'PLA (Polylactic Acid) is a biodegradable and eco-friendly plastic made from renewable resources like corn starch or sugarcane. It is commonly used in 3D printing, packaging, and disposable tableware due to its low environmental impact and ease of use. However, it has lower heat resistance and durability compared to some other plastics.' },
              // { name: 'ABS', desc: 'Durable and heat-resistant' },
              { image: 'https://images.squarespace-cdn.com/content/v1/5d88f1f13db677155dee50fa/bdbd1a02-6f15-40eb-9045-c14a5760ddfe/vlcsnap-2022-09-10-15h07m04s069.png', name: 'PETG', desc: 'PETG (Polyethylene Terephthalate Glycol-Modified) is a strong, durable, and slightly flexible plastic known for its impact resistance and chemical resistance. It is commonly used in 3D printing, food packaging, and medical applications. PETG offers a good balance between strength and flexibility while being easier to print than ABS and more durable than PLA.' },
              { image: 'https://www.snapmaker.com/blog/wp-content/uploads/2024/12/flexible-to-be-stretched-tpu-filament-1024x576.jpg', name: 'TPU', desc: 'TPU (Thermoplastic Polyurethane) is a flexible, rubber-like plastic known for its high elasticity, abrasion resistance, and durability. It is often used for phone cases, wearables, automotive parts, and flexible 3D prints. TPU is more difficult to print than rigid materials but offers excellent shock absorption and flexibility.' },
              // { name: 'Nylon', desc: 'High strength and durability' },
            ].map((material) => (
              // <Card key={material.name}>
              //   <CardContent className="pt-6">
              //could use cards, but don't wanna hah
              <div className="pt-6">
                <img className="rounded-3xl mb-5 w-full " style={{ height: "270px", objectFit: "cover" }} src={material.image}></img>
                <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
                <p className="text-slate-600">{material.desc}</p>
                {/* </CardContent>
              </Card> */}
              </div>
            ))}
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mt-6 text-center mx-auto">
            And more to come...
          </p>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="container  px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl">
            Upload your STL file and get an instant quote for your 3D printing project.
          </p>
          <Link to="/print">
            <Button size="lg" className="gap-2">
              Start Printing Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;