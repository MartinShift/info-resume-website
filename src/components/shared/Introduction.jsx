export const Introduction = () => {
var socials =
[
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/saprykin-martin-a96496249/',
  },
  {
    name: 'github',
    url: 'https://github.com/MartinShift?tab=repositories',
  },
  {
    name: 'gmail',
    url: 'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBmlqFlFcxlbCGXsZBqdsPVJzGffCZKwnjzBQBGCXwnDQXKPGzQxZxzddVWLrgHZsgzjTsq',
  }
]

return (
  <div className="mx-auto max-w-screen-lg px-3 py-6">
    <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-x-24">
    <div>
      <h1 className="text-3xl font-bold">
      Welcome to my profile
      </h1>
      <p className="mt-6 text-xl leading-9">
       I'm Martin, an aspiring software developer with a relentless drive for innovation.
      </p>
      <p className="mt-6 text-xl leading-9">
      I'm currently <strong className="text-lime-400">working</strong> on an existing project.
      </p>
      <div className="mt-3 flex gap-1">
      {socials.map((social) => (
        <a key={social.name} href={social.url}>
        <img 
          className="h-12 w-12 ml-3 hover:translate-y-1" 
          src={`/info-resume-website/${social.name}.png`} 
          alt={`${social.name} icon`} 
          loading="lazy"
        />
        </a>
      ))}
      </div>
    </div>
    <div className="shrink-0">
      <img className="h-70 w-70" src="/info-resume-website/me.png" alt="Avatar" loading="lazy"  />
    </div>
    </div>
  </div>
);
};