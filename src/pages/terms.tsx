const Terms = () => (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl">
        By using our services, you agree to the following terms and conditions:
      </p>
      <ol className="list-decimal ml-6 text-slate-600">
        <li>All uploaded files must comply with copyright and legal regulations.</li>
        <li>We are not responsible for errors in user-submitted models.</li>
        <li>Refunds are only issued for defective prints caused by our process.</li>
        <li>Users must provide accurate shipping information to avoid delivery issues.</li>
      </ol>
    </div>
  );
  
export default Terms;