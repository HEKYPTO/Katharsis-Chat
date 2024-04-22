
export default function Trusted() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Trusted by the most innovative teams</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Innovation knows no boundaries. Our platform empowers the most visionary teams to achieve their goals and revolutionize the world.
              </p>
              <div className="mt-8 flex items-center gap-x-6">
                <a
                  href="/signup"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create account
                </a>
                <a href="!" className="text-sm font-semibold text-gray-900">
                  Contact us <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            </div>
          </div>
        </div>
      </div>
    )
  }
  