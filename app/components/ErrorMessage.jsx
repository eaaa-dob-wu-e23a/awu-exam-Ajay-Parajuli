export default function ErrorMessage({ title, message, className }) {
    return (
      <div
        className={[
          "w-full bg-background text-secondary flex flex-col items-center justify-center h-[100vh]",
          className,
        ]
          .filter(Boolean) 
          .join(" ")} 
      >
        <h1 className="text-4xl font-bold text-secondary">Hov Saa!</h1>
        <h2 className="mb-3 text-3xl text-secondary">{title}</h2>
        <p className="text-2xl text-secondary">{message}</p>
      </div>
    );
  }