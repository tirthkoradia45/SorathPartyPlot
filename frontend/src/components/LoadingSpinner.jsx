function LoadingSpinner() {

  return (

    <div className="min-h-screen bg-[#111111] flex items-center justify-center">

      <div className="flex flex-col items-center gap-6">

        {/* Spinner */}

        <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>

        {/* Loading Text */}

        <p className="text-[#D4AF37] tracking-[0.25em] uppercase text-sm">

          Loading...

        </p>

      </div>

    </div>

  );

}

export default LoadingSpinner;