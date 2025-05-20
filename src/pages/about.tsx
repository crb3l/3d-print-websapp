import { Card, CardContent } from '../components/ui/card';

const About = () => (
  <div className="container mx-auto px-4 py-20">
    <h1 className="text-5xl font-bold mb-6">About Us</h1>
    <p className="text-xl text-slate-600 mb-8 max-w-2xl">
      We are passionate about bringing ideas to life through 3D printing. Our mission is to provide high-quality,
      reliable, and affordable 3D printing solutions for professionals, hobbyists, and businesses alike.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-slate-600">
            We aim to make custom manufacturing accessible, efficient, and seamless for everyone.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-slate-600">
            A future where 3D printing revolutionizes industries and everyday life.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);
export default About;
