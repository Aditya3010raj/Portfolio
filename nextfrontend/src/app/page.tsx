import { client, urlFor } from "../lib/sanity";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

export default async function Home() {
  // 1. FETCH PROFILE DATA
  const profileQuery = `*[_type == "profile"][0]{
    name, headline, subheadline, bio, profileImage, email, phone, location,
    "skills": skills[]{skillName, iconName, percentage},
    socialLinks,
    experience, yearsOfExperience, currentRole,
    education,
    availability,
    resumeUrl,
    languages,
    certifications,
    "featuredProjects": featuredProjects[]->{title, slug, mainImage, category, metadesc}
  }`;
  const profile = await client.fetch(profileQuery);

  // 2. FETCH LATEST BLOGS
  const query = `*[_type == "event"] | order(publishedAt desc)[0...3]{
    _id, title, slug, mainImage, metadesc, category, publishedAt, tags
  }`;
  const events = await client.fetch(query);

  const displayProjects = profile?.featuredProjects?.length > 0 ? profile.featuredProjects : events;
  const normalizedGithubLink = profile?.socialLinks?.github || "https://github.com/Aditya3010raj";

  return (
    <>
      <Script src="/assets/js/main.js"></Script>

      <Head>
        <title>{profile?.name || "Adityaraj Chatterjee"}</title>
        <link href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" rel="stylesheet" />
      </Head>

      <div id="main" className="relative bg-white text-black dark:bg-slate-950 dark:text-white transition-colors duration-300">

        {/* HERO SECTION */}
        <div className="relative bg-cover bg-center bg-no-repeat py-8" style={{ backgroundImage: "url(/assets/img/bg-hero.jpg)" }}>
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-primary/80 to-primary/40"></div>
          <div className="container relative z-30 pt-20 pb-12 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-40">
            <div className="flex flex-col items-center justify-center lg:flex-row gap-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow to-primary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative rounded-full border-8 border-primary shadow-2xl overflow-hidden bg-white">
                  <img
                    src={profile?.profileImage ? urlFor(profile.profileImage).url() : "/assets/img/blog-author.jpeg"}
                    className="h-48 w-48 object-cover sm:h-56 sm:w-56"
                    alt="author"
                  />
                </div>
                {/* FLOATING AC LOGO REMOVED PER REQUEST */}
              </div>

              <div className="pt-8 sm:pt-10 lg:pl-8 lg:pt-0">
                {profile?.availability && (
                  <span className="inline-block bg-yellow text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    ● {profile.availability === 'available' ? 'Available for Work' : 'Open to Opportunities'}
                  </span>
                )}
                <h1 className="text-center font-header text-4xl text-white sm:text-left sm:text-5xl md:text-6xl font-black tracking-tight">
                  I'm {profile?.name}
                </h1>
                <p className="text-center sm:text-left text-yellow font-bold uppercase tracking-widest mt-2">{profile?.headline}</p>

                <div className="flex flex-col justify-center pt-6 sm:flex-row sm:pt-8 lg:justify-start">
                  <div className="flex items-center justify-center gap-6">
                    {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" className="hover:scale-125 transition-transform"><i className="bx bxl-github text-4xl text-white hover:text-yellow"></i></a>}
                    {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" className="hover:scale-125 transition-transform"><i className="bx bxl-linkedin text-4xl text-white hover:text-yellow"></i></a>}
                    {profile?.socialLinks?.twitter && <a href={profile.socialLinks.twitter} target="_blank" className="hover:scale-125 transition-transform"><i className="bx bxl-twitter text-4xl text-white hover:text-yellow"></i></a>}
                    {profile?.socialLinks?.instagram && <a href={profile.socialLinks.instagram} target="_blank" className="hover:scale-125 transition-transform"><i className="bx bxl-instagram text-4xl text-white hover:text-yellow"></i></a>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-grey-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" id="about">
          <div className="container py-16 md:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <h2 className="font-header text-4xl font-black uppercase text-primary dark:text-yellow sm:text-5xl border-l-8 border-yellow pl-6">
                  {profile?.currentRole || "Engineering Student"}
                </h2>
                <p className="pt-8 text-xl leading-relaxed text-grey-20 dark:text-grey-10 font-medium">
                  {profile?.bio}
                </p>
                {profile?.experience && <p className="mt-4 text-sm italic opacity-70 border-t pt-4 border-slate-200 dark:border-slate-800">{profile.experience}</p>}

                <div className="pt-10 flex flex-wrap gap-4">
                  <a href={`mailto:${profile?.email}`} className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow hover:text-black transition-all shadow-lg">Hire Me</a>
                  {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" className="border-2 border-primary dark:border-yellow text-primary dark:text-yellow px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-yellow hover:text-white dark:hover:text-black transition-all">View Resume</a>}
                </div>
              </div>

              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border-t-4 border-yellow">
                  <i className="bx bx-rocket text-4xl text-yellow mb-4"></i>
                  {/* Ensure we convert the number to a string and provide a fallback */}
                  <h3 className="text-2xl font-black text-primary dark:text-white">
                    {profile?.yearsOfExperience?.toString() || "0"}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-grey-30 dark:text-grey-20">Years Experience</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border-t-4 border-primary">
                  <i className="bx bx-globe text-4xl text-primary mb-4"></i>
                  <h3 className="text-2xl font-black text-primary dark:text-white">VIT Chennai</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-grey-30 dark:text-grey-20">Current Campus</p>
                </div>
                {profile?.languages && (
                  <div className="col-span-1 sm:col-span-2 bg-slate-100 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50">Languages Known</p>
                    <div className="flex flex-wrap gap-3">
                      {profile.languages.map((lang: any, i: number) => (
                        <span key={i} className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                          {lang.language} • <span className="text-yellow">{lang.proficiency}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC SKILLS SECTION */}
        <div className="container py-20" id="skills">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-header text-4xl font-black uppercase text-primary dark:text-yellow sm:text-5xl">Technical Stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profile?.skills?.map((skill: any, index: number) => {
              let iconName = skill?.iconName || "bx-code-alt";
              if (!iconName.startsWith("bx")) iconName = `bxl-${iconName}`;

              return (
                <div key={index} className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 mb-6 group-hover:bg-yellow group-hover:rotate-12 transition-all duration-500 shadow-inner">
                    <i className={`bx ${iconName} text-4xl text-primary group-hover:text-black transition-colors`}></i>
                  </div>
                  <h3 className="text-md font-black uppercase tracking-widest text-primary dark:text-white">
                    {skill.skillName}
                  </h3>
                  {skill.percentage && (
                    <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-yellow h-full transition-all duration-1000" style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* EDUCATION & CERTIFICATIONS */}
        {(profile?.education || profile?.certifications) && (
          <div className="container py-20 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {profile?.education && (
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2">
                    <i className="bx bx-book-reader text-yellow"></i> Education
                  </h3>
                  <div className="space-y-8">
                    {profile.education.map((edu: any, i: number) => (
                      <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-yellow"></div>
                        <p className="text-xs font-black text-yellow uppercase tracking-widest">{edu.year}</p>
                        <h4 className="text-xl font-bold mt-1">{edu.degree}</h4>
                        <p className="font-medium opacity-70">{edu.institution}</p>
                        {edu.description && <p className="text-sm mt-2 opacity-60 italic">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile?.certifications && (
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2">
                    <i className="bx bx-certification text-yellow"></i> Certifications
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {profile.certifications.map((cert: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-yellow transition-colors">
                        <div>
                          <h4 className="font-bold text-sm">{cert.name}</h4>
                          <p className="text-[10px] opacity-60 uppercase font-black">{cert.issuer} • {cert.date}</p>
                        </div>
                        {cert.url && <a href={cert.url} target="_blank" className="text-yellow hover:scale-110 transition-transform"><i className="bx bx-link-external text-xl"></i></a>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROJECTS SECTION */}
        <div className="bg-primary dark:bg-slate-900 py-24" id="blog">
          <div className="container">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="font-header text-4xl font-black uppercase text-white sm:text-5xl">Selected Work</h2>
                <p className="pt-4 text-slate-300 text-lg italic">A collection of architectural solutions and high-performance applications.</p>
              </div>
              <Link
                href="/blog"
                className="group flex items-center gap-3 bg-yellow px-8 py-4 rounded-xl font-black uppercase tracking-widest text-black shadow-xl hover:scale-105 transition-all"
              >
                View Archive <i className="bx bx-right-arrow-alt text-2xl group-hover:translate-x-2 transition-transform"></i>
              </Link>
            </div>

            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
              {displayProjects.map((event: any, idx: number) => (
                <Link key={idx} href={`/blog/${event.slug.current}`} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={event.mainImage ? urlFor(event.mainImage).url() : "/assets/img/post-01.png"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={event.title}
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-yellow text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {event.category || "Project"}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-black dark:text-white group-hover:text-primary dark:group-hover:text-yellow transition-colors leading-tight line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="pt-4 text-grey-30 dark:text-grey-20 leading-relaxed line-clamp-3 opacity-80">
                      {event.metadesc}
                    </p>
                    <div className="mt-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary dark:text-yellow">
                      Project Details <i className="bx bx-right-arrow-alt text-xl"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="container py-24" id="contact">
          <div className="bg-yellow rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter leading-tight">Let's build <br /> something epic.</h2>
              <div className="mt-10 flex flex-col gap-6">
                {profile?.email && (
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center shadow-lg transform transition hover:scale-110"><i className="bx bx-envelope text-yellow text-2xl"></i></div>
                    <span className="text-xl font-bold text-black">{profile.email}</span>
                  </div>
                )}
                {/* NEW PHONE NUMBER FIELD */}
                {profile?.phone && (
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center shadow-lg transform transition hover:scale-110"><i className="bx bx-phone text-yellow text-2xl"></i></div>
                    <span className="text-xl font-bold text-black">{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center shadow-lg transform transition hover:scale-110"><i className="bx bx-map text-yellow text-2xl"></i></div>
                    <span className="text-xl font-bold text-black">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/*<div className="bg-white rounded-3xl p-8 shadow-2xl w-full lg:w-[450px]">
                <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-widest italic text-center underline decoration-yellow decoration-4 underline-offset-8">Quick Message</h3>
                <form className="space-y-4">
                    <input type="text" placeholder="Name" className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold focus:ring-2 ring-yellow transition-all" />
                    <input type="email" placeholder="Email" className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold focus:ring-2 ring-yellow transition-all" />
                    <textarea placeholder="Your Vision" rows={4} className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold focus:ring-2 ring-yellow transition-all"></textarea>
                    <button className="w-full bg-primary py-4 rounded-xl text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Send Proposal</button>
                </form>
            </div>*/}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="py-12 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-black uppercase tracking-[0.5em] opacity-40">Adityaraj Chatterjee • {new Date().getFullYear()}</p>
        </footer>

      </div>
    </>
  );
}