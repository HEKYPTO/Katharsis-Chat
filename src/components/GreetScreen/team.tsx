import Image from "next/image"
import Link from "next/link";

const people = [
  {
    name: 'HEKYPTO',
    role: 'Web-Interface Designer',
    imageUrl: 'https://avatars.githubusercontent.com/u/105188275?v=4',
    bio: 'Crafting captivating digital experiences with innovative design and seamless functionality.',
    link: "https://github.com/HEKYPTO"
  },
  {
    name: 'Chomchaby',
    role: 'Socket-DB Designer',
    imageUrl: 'https://avatars.githubusercontent.com/u/87964352?v=4',
    bio: 'Excels in backend architecture, shaping robust systems for seamless data exchange.',
    link: "https://github.com/chomchaby"
  },
  {
    name: 'JdomenusRex',
    role: 'API Master',
    imageUrl: 'https://avatars.githubusercontent.com/u/97604415?v=4',
    bio: 'Revolutionizing integration with visionary API architectures and expertise in AXIOS principles.',
    link: "https://github.com/Jdomenusrex"
  },
  {
    name: 'Nathathaii',
    role: 'DB-Infra Engineer',
    imageUrl: 'https://avatars.githubusercontent.com/u/111551122?v=4',
    bio: 'Ensuring the smooth operation of critical data systems with meticulous database management.',
    link: "https://github.com/Nathathaii"
  }
];
  
  export default function Team() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best results for our clients.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {people.map((person) => (
              <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
                <Link href={person.link}>
                  <Image className="flex-none rounded-full object-cover" src={person.imageUrl} alt={person.name} width={220} height={220} loading="lazy"/>
                </Link>
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-base leading-7 text-gray-600">{person.role}</p>
                  <p className="mt-6 text-base leading-7 text-gray-600">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  