export default function Logos() {
  return (
    <div className="bg-white py-25">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by thye world's most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 text-gray-900"
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg"
            alt="Transistor"
            width={158}
            height={48}
          />

          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg"
            alt="Reform"
            width={158}
            height={48}
          />

          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg"
            alt="Tuple"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg"
            alt="Savvycal"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
