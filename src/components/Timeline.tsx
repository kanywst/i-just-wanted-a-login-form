import { m, useReducedMotion } from 'framer-motion';
import { Section } from './Section';

interface Milestone {
  year: string;
  title: string;
  note: string;
  color: string;
}

// Dates are real. The commentary is not neutral.
const milestones: Milestone[] = [
  {
    year: '1989',
    title: 'Kerberos',
    note: 'MIT names its auth protocol after the three-headed dog guarding the gates of Hell. Foreshadowing.',
    color: '#A855F7',
  },
  {
    year: '1992',
    title: 'RBAC',
    note: 'NIST formalizes Role-Based Access Control. "Admin, Editor, Viewer." It will not be enough.',
    color: '#facc15',
  },
  {
    year: '2005',
    title: 'SAML 2.0',
    note: 'OASIS ships an XML standard so large it needs its own glossary. Enterprises rejoice.',
    color: '#60a5fa',
  },
  {
    year: '2012',
    title: 'OAuth 2.0',
    note: 'RFC 6749 ships. Its lead author quits the working group and removes his name. "The road to hell."',
    color: '#ff0000',
  },
  {
    year: '2014',
    title: 'OpenID Connect',
    note: 'Turns out OAuth was never authentication. So they bolt an identity layer on top of it.',
    color: '#00ff00',
  },
  {
    year: '2019',
    title: 'Zanzibar',
    note: 'Google publishes a paper on planet-scale ReBAC. Now every startup reimplements it.',
    color: '#22d3ee',
  },
  {
    year: '2022',
    title: 'Passkeys',
    note: 'Apple, Google, and Microsoft declare the password dead. Users still type passwords.',
    color: '#00ff00',
  },
  {
    year: 'today',
    title: 'You',
    note: 'You still cannot log in.',
    color: '#ff0000',
  },
];

export function Timeline() {
  const reduceMotion = useReducedMotion();
  return (
    <Section className="border-t border-neutral-900 border-dashed">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="huge-text text-white text-center mb-4">Thirty years of "just a login."</h2>
        <p className="text-lg text-gray-500 text-center mb-16 font-mono">
          None of this was supposed to happen.
        </p>

        <ol className="relative border-l border-zinc-800 ml-3 space-y-10">
          {milestones.map((ms, i) => (
            <m.li
              key={ms.year + ms.title}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={reduceMotion ? { duration: 0.25 } : { duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="ml-8 relative"
            >
              <span
                className="absolute -left-[41px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-black"
                style={{ borderColor: ms.color }}
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="font-mono text-sm font-bold tracking-widest uppercase"
                  style={{ color: ms.color }}
                >
                  {ms.year}
                </span>
                <span className="text-white font-bold text-lg">{ms.title}</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base mt-1 leading-relaxed">{ms.note}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
