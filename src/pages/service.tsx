import React, { useRef, useEffect, useState, useCallback, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast"; // Make sure this is imported
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const colorMap = {
  white: '#ffffff', black: '#000000', gray: '#808080', red: '#ff0000',
  blue: '#0000ff', green: '#00ff00', yellow: '#ffff00', purple: '#800080', orange: '#ffa500',
};

const materialColorMap: Record<string, string[]> = {
  pla: ["white", "black", "gray", "red", "blue", "green", "yellow", "purple", "orange"],
  abs: ["white", "black", "gray", "red", "blue"],
  petg: ["white", "black", "transparent", "blue", "green"],
};

// The basic model component
interface ModelProps {
  geometry?: THREE.BufferGeometry;
  color: string;
}

const Model: React.FC<ModelProps> = ({ geometry, color }) => {
  if (!geometry) return null;
  const hexColor = colorMap[color as keyof typeof colorMap] || color;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={hexColor} />
    </mesh>
  );
};

// Industrial-style controls similar to CAD software
const CADControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping={false}
      screenSpacePanning={true}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.PAN
      }}
      enableZoom={true}
      zoomSpeed={1.2}
      rotateSpeed={0.8}
    />
  );
};

// The coordinate system axes for reference
const CoordinateAxes = () => {
  return (
    <group>
      {/* X axis - red */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute attach="attributes-position" args={[[0, 0, 0, 10, 0, 0], 3]} />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="red" />
      </line>

      {/* Y axis - green */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute attach="attributes-position" args={[[0, 0, 0, 0, 10, 0], 3]} />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="green" />
      </line>

      {/* Z axis - blue */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute attach="attributes-position" args={[[0, 0, 0, 0, 0, 10], 3]} />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="blue" />
      </line>
    </group>
  );
};

interface ModelViewerProps {
  geometry?: THREE.BufferGeometry;
  color: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ geometry, color }) => {
  return (
    <div className="w-full h-96 bg-gray-100 rounded border border-gray-300">
      <Canvas
        camera={{ position: [30, 20, 30], fov: 45 }}
        shadows={false}
        flat
      >
        <color attach="background" args={['#f2f2f2']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />

        <Suspense fallback={null}>
          {/* Main model */}
          {geometry && <Model geometry={geometry} color={color} />}

          {/* Fusion360-like grid */}
          <Grid
            args={[100, 100]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#aaa"
            sectionSize={10}
            sectionThickness={1}
            sectionColor="#888"
            fadeDistance={100}
            fadeStrength={1}
            position={[0, -0.01, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />

          {/* Reference axes */}
          <CoordinateAxes />

          {/* Controls */}
          <CADControls />
        </Suspense>
      </Canvas>

      {/* Simple instructions */}
      <div className="absolute mt-6 text-xs bg-black bg-opacity-10 p-1 rounded border-2">
        Left-click: Rotate | Middle/Right-click: Pan | Scroll: Zoom
      </div>
    </div>
  );
};

interface PriceCalculatorProps {
  volume: number;
  quantity: number;
  infill: number;
  onPriceChange: (price: number) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ volume, quantity, infill, onPriceChange }) => {
  const basePrice = 20;
  const pricePerCm3 = 0.5;

  const [quantity_s, setQuantity_s] = useState(quantity.toString());
  const localQuantity = Number(quantity_s);
  const total = (basePrice + volume * Math.pow((infill / 100), 2) * pricePerCm3) * localQuantity;
  const isSpecialBatch = localQuantity === 10;
  const isVolumeMissing = volume === 0;

  // Update the parent component when price changes
  useEffect(() => {
    onPriceChange(total);
  }, [total, onPriceChange]);

  return (
    <Card className="w-full my-4">
      <CardHeader>
        <CardTitle>Price Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className='space-y-2'>
            <Label>Quantity</Label>
            <Select value={quantity_s} onValueChange={(value) => {
              setQuantity_s(value);
            }}>
              <SelectTrigger id="quantity_s">
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isSpecialBatch && (
            <div className="text-sm text-600 font-medium">
              For orders bigger than 10 units, please contact sales.
            </div>
          )}

          {isVolumeMissing ? (
            <div className="flex justify-between pt-2 border-t">
              <span className="text-base font-semibold">Total (estimation):</span>
              <span className="text-base font-semibold">-.-- RON</span>
            </div>
          ) : isSpecialBatch ? (
            <div className="flex justify-between pt-2 border-t">
              <span className="text-base font-semibold">Total (estimation):</span>
              <span className="text-base font-semibold">Please{' '}
                <a href="/contact" className="underline text-primary hover:highlight/80">contact sales</a>{' '}
                for an estimation.
              </span>
            </div>
          ) : (
            <div className="flex justify-between pt-2 border-t">
              <span className="text-base font-semibold">Total (estimation):</span>
              <span className="text-base font-semibold">{total.toFixed(2)} RON</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PrintService: React.FC = () => {
  // Model and print settings
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [modelGeometry, setModelGeometry] = useState<THREE.BufferGeometry | undefined>();
  const [modelVolume, setModelVolume] = useState(0);
  const [material, setMaterial] = useState("pla");
  const [quality, setQuality] = useState("standard");
  const [color, setColor] = useState("white");
  const [infill, setInfill] = useState("15");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // User information
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    orderNumber?: string;
  } | null>(null);

  const availableColors = materialColorMap[material] || [];

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast({
        title: "Error",
        description: "File could not be uploaded",
        variant: "destructive",
      });
      return;
    }

    setModelFile(file);

    const calculateMeshVolume = (geometry: THREE.BufferGeometry): number => {
      // Ensure the geometry has faces (it should be a BufferGeometry with position attribute)
      if (!geometry.attributes.position) {
        console.error('Geometry does not have position attribute');
        return 0;
      }

      // Get position data
      const positions = geometry.attributes.position.array;
      let volume = 0;

      // STL files typically use triangular faces
      // For each triangle in the mesh:
      for (let i = 0; i < positions.length; i += 9) {
        // Get the three vertices of this triangle
        const v1 = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        const v2 = new THREE.Vector3(positions[i + 3], positions[i + 4], positions[i + 5]);
        const v3 = new THREE.Vector3(positions[i + 6], positions[i + 7], positions[i + 8]);

        // Calculate the signed volume of the tetrahedron formed by this triangle and the origin
        // Formula: V = (1/6) * |(v1 × v2) · v3|
        const crossProduct = new THREE.Vector3().crossVectors(v2, v3);
        const tetraVolume = Math.abs(v1.dot(crossProduct)) / 6;

        // Add to total volume
        volume += tetraVolume;
      }

      // Convert to cm³ (assuming the model is in mm, divide by 1000)
      return volume / 1000;
    };

    // Usage in your loading function:
    try {
      const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
      const loader = new STLLoader();
      const arrayBuffer = await file.arrayBuffer();
      const geometry = loader.parse(arrayBuffer);
      setModelGeometry(geometry);

      // Calculate accurate volume based on mesh triangles
      const volumeCm3 = calculateMeshVolume(geometry);
      setModelVolume(volumeCm3);
      console.log("Volume calculated:", volumeCm3);

      // If you still want the bounding box dimensions (for display purposes)
      const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
      const size = new THREE.Vector3();
      box.getSize(size);

    } catch (error) {
      console.error('Error loading STL:', error);
      toast({
        title: "Error",
        description: "File could not be loaded",
        variant: "destructive",
      });
    }
  }, []);

  // const handleQuantityChange = (value: number) => {
  //   setQuantity(value);
  // };

  const handlePriceChange = (price: number) => {
    setTotalPrice(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!modelFile) {
      toast({
        title: "Missing file",
        description: "Please upload a 3D model file",
        variant: "destructive",
      });
      return;
    }

    if (!userName || !userEmail) {
      toast({
        title: "Missing information",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Create form data for file upload
    const formData = new FormData();
    formData.append('modelFile', modelFile);

    // Add all the order details
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('phoneNumber', phoneNumber);
    formData.append('material', material);
    formData.append('quality', quality);
    formData.append('color', color);
    formData.append('infill', infill);
    formData.append('quantity', quantity.toString());
    formData.append('message', message);
    formData.append('volume', modelVolume.toString());
    formData.append('totalPrice', totalPrice.toString());
    formData.append('sendEmail', 'true');
    formData.append('userAddress', userAddress);

    try {
      const response = await fetch('https://treideee.ro/api/submit-order', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: 'Your order has been placed successfully! Check your email for confirmation details.',
          orderNumber: result.orderNumber,
        });

        // Clear the form
        setModelFile(null);
        setModelGeometry(undefined);
        setModelVolume(0);
        setMaterial("pla");
        setQuality("standard");
        setColor("white");
        setInfill("15");
        setQuantity(1);
        setMessage("");
        setUserName("");
        setUserEmail("");
        setPhoneNumber("");

        toast({
          title: "Order placed successfully!",
          description: `Order #${result.orderNumber} has been submitted. A confirmation email has been sent to your inbox.`,
        });
      } else {
        throw new Error(/*result.error || */'Failed to place order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? /*error.message, doar ca mie nu imi place ca se vede eroaerea*/'Failed to place order. Please try again later.' : 'Failed to place order. Please try again later.'
      });

      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Model</CardTitle>
                <CardDescription>Upload your 3D model in STL format</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="stl-file">STL File</Label>
                <Input id="stl-file" type="file" accept=".stl" onChange={handleFileChange} className="mt-1 mb-3" />
                <ModelViewer geometry={modelGeometry} color={color} />
              </CardContent>
              <div className="mt-8 mx-6 mb-2 space-y-2">
                <Label htmlFor="order-message">Order Message (Optional)</Label>
                <Textarea
                  id="order-message"
                  placeholder="Add a note or special instructions for this order..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-100 rounded"
                />
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>We'll use this to contact you about your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Full Name*</Label>
                  <Input
                    id="user-name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-email">Email Address*</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                  <p className="text-xs text-gray-600">Order confirmation will be sent to this email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-adddress">Delivery Address*</Label>
                  <Input
                    id="delivery-adddress"
                    type="address"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="Str. Ixulescu, nr. 42, bl.1, sc. A, et. 6, ap.9"
                    required
                  />
                  <p className="text-xs text-gray-600">The product will be sent to this address. Please include the city and postal code.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number (Optional)</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Your contact number"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
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
                    <Label htmlFor="strength">Infill (Strength):</Label>
                    <Select value={infill} onValueChange={setInfill}>
                      <SelectTrigger id="infill">
                        <SelectValue placeholder="Select infill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15% Infill: +0.00 RON</SelectItem>
                        <SelectItem value="35">35% Infill: +{((Math.pow((Number("35") / 100), 2) * modelVolume * 0.5) - (Math.pow((Number("15") / 100), 2) * modelVolume * 0.5)).toFixed(2)} RON</SelectItem>
                        <SelectItem value="50">50% Infill: +{((Math.pow((Number("50") / 100), 2) * modelVolume * 0.5) - (Math.pow((Number("15") / 100), 2) * modelVolume * 0.5)).toFixed(2)} RON</SelectItem>
                        <SelectItem value="100">100% Infill: +{((Math.pow((Number("100") / 100), 2) * modelVolume * 0.5) - (Math.pow((Number("15") / 100), 2) * modelVolume * 0.5)).toFixed(2)} RON</SelectItem>
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
                </div>
              </CardContent>
            </Card>

            <PriceCalculator
              volume={modelVolume}
              quantity={quantity}
              infill={Number(infill)}
              onPriceChange={handlePriceChange}
            />

            {submitStatus && (
              <Alert className={`mb-4 ${submitStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
                {submitStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={submitStatus.success ? 'text-green-800' : 'text-red-800'}>
                  {submitStatus.message}
                  {submitStatus.orderNumber && (
                    <div className="font-medium mt-1">Order #: {submitStatus.orderNumber}</div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting || !modelFile || !userEmail || !userName || !userAddress}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrintService;