const PrintCheckout = () => {
    return (
        <div className="container mx-auto px-4 py-10" >
            <h1 className="test-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Cart Items */}
                    <section className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">Your Items</h2>
                        {/* TODO: List cart items here */}
                    </section>

                    {/* Customer Info */}
                    <section className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                        {/* TODO: Form fields go here */}
                    </section>
                </div>

                {/* Right side (1/3 width) */}
                <div className="bg-white p-6 rounded-xl shadow h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    {/* TODO: Price breakdown and Place Order button */}
                </div>
            </div>
        </div>
    );
};
export default PrintCheckout;