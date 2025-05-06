export default function LogoEduPass() {
    return (
      <div className="flex items-center space-x-3">
        {/* Ícone */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Livro/ponte estilizado */}
          <path
            d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V6Z"
            stroke="#2563EB"
            strokeWidth="2"
            rx="2"
          />
          <path
            d="M2 9H22"
            stroke="#FACC15"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
  
        {/* Texto Edu-Pass */}
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Edu</span>
          <span className="text-yellow-400">-Pass</span>
        </h1>
      </div>
    );
  }
  