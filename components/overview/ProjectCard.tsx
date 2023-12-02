import Rating from '../common/Rating';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ProjectCard({ project }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/posts/' + project.url)}
      className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
    >
      <div className="border rounded-md overflow-hidden shadow-md hover:shadow-xl">
        <div className="absolute m-1">
          {project.status == 'pay' ? (
            <div
              data-tooltip-target="tooltip-default"
              className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-400 dark:text-green-200"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
          ) : project.status == 'scam' ? (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-400 dark:text-red-200">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
          ) : project.status == 2 ? (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-400 dark:text-orange-200">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-500 bg-orange-100 rounded-lg dark:bg-gray-400 dark:text-orange-200">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M19.305,9.61c-0.235-0.235-0.615-0.235-0.85,0l-1.339,1.339c0.045-0.311,0.073-0.626,0.073-0.949 c0-3.812-3.09-6.901-6.901-6.901c-2.213,0-4.177,1.045-5.44,2.664l0.897,0.719c1.053-1.356,2.693-2.232,4.543-2.232 c3.176,0,5.751,2.574,5.751,5.751c0,0.342-0.037,0.675-0.095,1l-1.746-1.39c-0.234-0.235-0.614-0.235-0.849,0 c-0.235,0.235-0.235,0.615,0,0.85l2.823,2.25c0.122,0.121,0.282,0.177,0.441,0.172c0.159,0.005,0.32-0.051,0.44-0.172l2.25-2.25 C19.539,10.225,19.539,9.845,19.305,9.61z M10.288,15.752c-3.177,0-5.751-2.575-5.751-5.752c0-0.276,0.025-0.547,0.062-0.813 l1.203,1.203c0.235,0.234,0.615,0.234,0.85,0c0.234-0.235,0.234-0.615,0-0.85l-2.25-2.25C4.281,7.169,4.121,7.114,3.961,7.118 C3.802,7.114,3.642,7.169,3.52,7.291l-2.824,2.25c-0.234,0.235-0.234,0.615,0,0.85c0.235,0.234,0.615,0.234,0.85,0l1.957-1.559 C3.435,9.212,3.386,9.6,3.386,10c0,3.812,3.09,6.901,6.902,6.901c2.083,0,3.946-0.927,5.212-2.387l-0.898-0.719 C13.547,14.992,12.008,15.752,10.288,15.752z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
          )}
        </div>

        <div className="h-44 md:h-56 lg:h-64 overflow-hidden">
          <Image
            width={300}
            height={50}
            alt={`image for ${project.image}`}
            className="hover:grow cursor-pointer"
            src={project.image}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="p-2">
          <div className="font-bold text-xl mb-2 break-words">
            {project.url}
          </div>
          <p className="text-gray-900">{project.yields}</p>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p>
              {project.creation_date == 'None'
                ? 'Long time ago'
                : project.creation_date}
            </p>
            <Rating stars={project.stars} />
          </div>
        </div>
      </div>
    </div>
  );
}
