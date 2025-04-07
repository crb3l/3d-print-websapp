// import React, { useState, useCallback, Suspense, } from 'react';
// import { Canvas } from '@react-three/fiber';
// import {  OrbitControls, 
//   Stage, 
//   PresentationControls,
//   Environment,
//   AccumulativeShadows,
//   RandomizedLight,
// Center } from '@react-three/drei';
// import * as THREE from 'three';
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {Label} from "@/components/ui/label"

// const colorMap = {
//   white: '#ffffff',
//   black: '#000000',
//   gray: '#808080',
//   red: '#ff0000',
//   blue: '#0000ff',
//   green: '#00ff00',
//   yellow: '#ffff00',
//   purple: '#800080',
//   orange: '#ffa500',
// };

// interface ModelProps {
//   geometry?: THREE.BufferGeometry;
//   color: string;
// }

// const Model: React.FC<ModelProps> = ({ geometry, color }) => {
//   if (!geometry) return null;

//   const hexColor = colorMap[color as keyof typeof colorMap] || color;

//   return (
//     <Center>
//       <PresentationControls
//         global
//         enabled

//         // rotation={[0, -Math.PI / 4, 0]}
//         // polar={[-Math.PI / 4, Math.PI / 4]}
//         azimuth={[-Math.PI / 4, Math.PI / 4]}>
//         <mesh geometry={geometry} castShadow receiveShadow>
//           <meshStandardMaterial
//             color={hexColor}
//             roughness={0.5}
//             metalness={0.2}
//             envMapIntensity={1}
//           />
//         </mesh>
//       </PresentationControls>

//       <AccumulativeShadows 
//         temporal 
//         frames={60} 
//         alphaTest={0.85} 
//         scale={10} 
//         position={[0, -0.5, 0]}>
//         <RandomizedLight 
//           amount={8} 
//           radius={5} 
//           intensity={0.25} 
//           ambient={0.5} 
//           position={[5, 5, -10]} 
//         />
//       </AccumulativeShadows>
//     </Center>
//   );
// };

// interface ModelViewerProps {
//   geometry?: THREE.BufferGeometry;
//   color: string;
// }

// const ModelViewer: React.FC<ModelViewerProps> = ({ geometry, color }) => {
//   return (
//     <div className="w-full h-96 bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg overflow-hidden">
//       <Canvas 
//         shadows 
//         dpr={[1, 2]} 
//         camera={{ position: [0, 0, 100], fov: 45 }}
//         gl={{ preserveDrawingBuffer: true }}>
//         <color attach="background" args={['#f8f9fa']} />

//         <Suspense fallback={null}>
//           <Stage 
//             environment="city" 
//             intensity={0.5}
//             adjustCamera={false}
//             shadows={{ type: 'contact', color: '#404040', opacity: 0.8 }}>
//             {geometry && <Model geometry={geometry} color={color} />}
//           </Stage>
//           <Environment preset="studio" />
//         </Suspense>

//         <OrbitControls 
//           makeDefault
//           // minPolarAngle={0}
//           // maxPolarAngle={Math.PI / 1.75}
//           // enableZoom={true}
//           // enablePan={true}
//         />
//       </Canvas>
//     </div>
//   );
// };

// interface PriceCalculatorProps {
//   volume: number;
// }

// const PriceCalculator: React.FC<PriceCalculatorProps> = ({ volume }) => {
//   const basePrice = 20;
//   const pricePerCm3 = 0.5;
//   // if (volume < 10)
//   const total = basePrice + (volume * pricePerCm3);

//   return (
//     <Card className="w-full mt-4">
//       <CardHeader>
//         <CardTitle>Price Estimate</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span className="text-sm text-muted-foreground">Base Price:</span>
//             <span className="text-sm font-medium">{basePrice.toFixed(2)} RON</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-sm text-muted-foreground">Volume Cost:</span>
//             <span className="text-sm font-medium">{(volume * pricePerCm3).toFixed(2)} RON</span>
//           </div>
//           <div className="flex justify-between pt-2 border-t">
//             <span className="text-base font-semibold">Total (estimation):</span>
//             <span className="text-base font-semibold">{total.toFixed(2)} RON</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const PrintService: React.FC = () => {
//   const [modelGeometry, setModelGeometry] = useState<THREE.BufferGeometry | undefined>();
//   const [modelVolume, setModelVolume] = useState(100);
//   const [material, setMaterial] = useState("pla");
//   const [quality, setQuality] = useState("standard");
//   const [color, setColor] = useState("white");

//   // const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = event.target.files?.[0];
//   //   if (!file) return;

//   //   try {
//   //     const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
//   //     const loader = new STLLoader();
//   //     const arrayBuffer = await file.arrayBuffer();
//   //     const geometry = loader.parse(arrayBuffer);
//   //     setModelGeometry(geometry);

//   //     const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
//   //     const size = new THREE.Vector3();
//   //     box.getSize(size);
//   //     const approxVolume = size.x * size.y * size.z;
//   //     setModelVolume(approxVolume);
//   //   } catch (error) {
//   //     console.error('Error loading STL:', error);
//   //   }
//   // }, []);

//   const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
//       const loader = new STLLoader();
//       const arrayBuffer = await file.arrayBuffer();
//       const geometry = loader.parse(arrayBuffer);
//       setModelGeometry(geometry);

//       const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
//       const size = new THREE.Vector3();
//       box.getSize(size);
//       // Convert to cm³ (assuming STL is in mm)
//       const volumeCm3 = (size.x * size.y * size.z) / 1000; // Convert from mm³ to cm³
//       setModelVolume(volumeCm3);
//     } catch (error) {
//       console.error('Error loading STL:', error);
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">3D Print Service</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Upload Model</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="stl-file">STL File</Label>
//                   <Input
//                     id="stl-file"
//                     type="file"
//                     accept=".stl"
//                     onChange={handleFileChange}
//                     className="mt-1"
//                   />
//                 </div>

//                 <ModelViewer geometry={modelGeometry} color={color} />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-4">
// <Card>
//   <CardHeader>
//     <CardTitle>Print Settings</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="material">Material</Label>
//         <Select value={material} onValueChange={setMaterial}>
//           <SelectTrigger id="material">
//             <SelectValue placeholder="Select material" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="pla">PLA</SelectItem>
//             <SelectItem value="abs">ABS</SelectItem>
//             <SelectItem value="petg">PETG</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="quality">Quality</Label>
//         <Select value={quality} onValueChange={setQuality}>
//           <SelectTrigger id="quality">
//             <SelectValue placeholder="Select quality" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="rough">Rough (0.6mm)</SelectItem>
//             <SelectItem value="standard">Standard (0.4mm)</SelectItem>
//             <SelectItem value="fine">Fine (0.2mm)</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="color">Color</Label>
//         <Select value={color} onValueChange={setColor}>
//           <SelectTrigger id="color">
//             <SelectValue placeholder="Select color" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="white">White</SelectItem>
//             <SelectItem value="black">Black</SelectItem>
//             <SelectItem value="gray">Gray</SelectItem>
//             <SelectItem value="red">Red</SelectItem>
//             <SelectItem value="blue">Blue</SelectItem>
//             <SelectItem value="green">Green</SelectItem>
//             <SelectItem value="yellow">Yellow</SelectItem>
//             <SelectItem value="purple">Purple</SelectItem>
//             <SelectItem value="orange">Orange</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   </CardContent>
// </Card>

//           <PriceCalculator volume={modelVolume} />

//           <Button className="w-full" size="lg">
//             Place Order
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrintService;

import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Stage, Environment, AccumulativeShadows, RandomizedLight, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const colorMap = {
  white: '#ffffff', black: '#000000', gray: '#808080', red: '#ff0000',
  blue: '#0000ff', green: '#00ff00', yellow: '#ffff00', purple: '#800080', orange: '#ffa500',
};

const materialColorMap: Record<string, string[]> = {
  pla: ["white", "black", "gray", "red", "blue", "green", "yellow", "purple", "orange"],
  abs: ["white", "black", "gray", "red", "blue"],
  petg: ["white", "black", "transparent", "blue", "green"],
};


interface ModelProps {
  geometry?: THREE.BufferGeometry;
  color: string;
}

const Model: React.FC<ModelProps> = ({ geometry, color }) => {
  if (!geometry) return null;
  const hexColor = colorMap[color as keyof typeof colorMap] || color;

  return (
    <Center>
      <PresentationControls global enabled azimuth={[-Math.PI / 6, Math.PI / 6]}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial color={hexColor} roughness={0.5} metalness={0.2} envMapIntensity={1} />
        </mesh>
      </PresentationControls>
      <AccumulativeShadows temporal frames={60} alphaTest={0.85} scale={10} position={[0, -0.5, 0]}>
        <RandomizedLight amount={8} radius={5} intensity={0.25} ambient={0.5} position={[5, 5, -10]} />
      </AccumulativeShadows>
    </Center>
  );
};

interface ModelViewerProps {
  geometry?: THREE.BufferGeometry;
  color: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ geometry, color }) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 50], fov: 45 }}>
        <color attach="background" args={['#f8f9fa']} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            {geometry && <Model geometry={geometry} color={color} />}
          </Stage>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

interface PriceCalculatorProps {
  volume: number;
  quantity: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ volume, quantity }) => {
  const basePrice = 20;
  const pricePerCm3 = 0.5;
  const total = (basePrice + volume * pricePerCm3) * quantity;

  return (
    <Card className="w-full my-4">
      <CardHeader>
        <CardTitle>Price Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Base Price:</span>
            <span className="text-sm font-medium">{basePrice.toFixed(2)} RON</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Volume Cost:</span>
            <span className="text-sm font-medium">{(volume * pricePerCm3).toFixed(2)} RON</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Quantity:</span>
            <span className="text-sm font-medium">{quantity}</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="text-base font-semibold">Total (estimation):</span>
            <span className="text-base font-semibold">{total.toFixed(2)} RON</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PrintService: React.FC = () => {
  const [modelGeometry, setModelGeometry] = useState<THREE.BufferGeometry | undefined>();
  const [modelVolume, setModelVolume] = useState(100);
  const [material, setMaterial] = useState("pla");
  const [quality, setQuality] = useState("standard");
  const [color, setColor] = useState("white");
  const [quantity, setQuantity] = useState(1);
  const availableColors = materialColorMap[material] || [];

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
      const loader = new STLLoader();
      const arrayBuffer = await file.arrayBuffer();
      const geometry = loader.parse(arrayBuffer);
      setModelGeometry(geometry);

      const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
      const size = new THREE.Vector3();
      box.getSize(size);
      const volumeCm3 = (size.x * size.y * size.z) / 1000;
      setModelVolume(volumeCm3);
    } catch (error) {
      console.error('Error loading STL:', error);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">3D Print Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Upload Model</CardTitle></CardHeader>
          <CardContent>
            <Label htmlFor="stl-file">STL File</Label>
            <Input id="stl-file" type="file" accept=".stl" onChange={handleFileChange} className="mt-1 mb-3" />
            <ModelViewer geometry={modelGeometry} color={color} />
          </CardContent>
        </Card>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Print Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pla">PLA</SelectItem>
                      <SelectItem value="abs">ABS</SelectItem>
                      <SelectItem value="petg">PETG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger id="quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rough">Rough (0.6mm)</SelectItem>
                      <SelectItem value="standard">Standard (0.4mm)</SelectItem>
                      <SelectItem value="fine">Fine (0.2mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColors.map((colorOption) => (
                        <SelectItem key={colorOption} value={colorOption}>
                          {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </div>
                <div className='space-y-2'><Label>Quantity</Label>
                  <Slider min={1} max={10} step={1} value={quantity} onChange={setQuantity} /></div>
              </div>
            </CardContent>
          </Card>
          <PriceCalculator volume={modelVolume} quantity={quantity} />
          <Button className="w-full" size="lg">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default PrintService;
