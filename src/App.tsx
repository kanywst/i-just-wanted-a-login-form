import { m, useReducedMotion } from 'framer-motion';
import { Section, ProgressBar } from './components/Section';
import { CodeBlock } from './components/CodeBlock';
import { LogoPair } from './components/LogoPair';
import { Quote } from './components/Quote';
import { StatCounter } from './components/StatCounter';
import { Timeline } from './components/Timeline';
import { MachineAuthSection } from './components/MachineAuth';

function App() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <ProgressBar />

      {/* Section 1: Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="max-w-5xl mx-auto text-center w-full">
          <m.h1
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 text-[var(--color-terminal)]"
            style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}
          >
            I just wanted a login form.
            <span className="cursor-blink" aria-hidden="true">▊</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-2xl text-gray-500 mt-12 max-w-2xl mx-auto leading-relaxed"
          >
            A short story about modern authentication and authorization.
          </m.p>
        </div>
        <m.div
          animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 text-gray-600 text-4xl"
        >
          ↓
        </m.div>
      </section>

      {/* Section 2: Simple Auth */}
      <Section className="border-t border-neutral-900 border-dashed">
        <div className="max-w-4xl mx-auto text-center space-y-12 w-full">
          <h2 className="huge-text text-white">You start simple.</h2>
          <p className="text-2xl md:text-4xl text-gray-400">Username and Password in a database.</p>
          <Quote className="max-w-2xl text-xl md:text-3xl mt-8">It works. Users can log in.</Quote>
          <div className="pt-12 text-gray-500 font-bold uppercase tracking-widest text-xl">But then...</div>
        </div>
      </Section>

      {/* Section 3: Social Login */}
      <Section className="bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center space-y-16 w-full">
          <h2 className="huge-text text-[var(--color-error)]">Users forget passwords.</h2>
          <p className="text-2xl md:text-4xl text-gray-300 flex flex-col gap-4">
            <span>So you decide to add "Sign in with Google."</span>
            <span className="text-xl md:text-3xl mt-4">You investigate <span className="bg-[var(--color-error)] text-white px-3 py-1 font-bold">OAuth 2.0</span> and <span className="bg-[var(--color-error)] text-white px-3 py-1 font-bold">OIDC</span>.</span>
          </p>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
            You learn, painfully, that <span className="text-white font-bold">OAuth is not authentication</span> — it's
            authorization. That's why OIDC had to be invented and bolted on top.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-4xl mx-auto">
            <LogoPair src="logos/auth0.png" alt="Auth0" text="Auth0" />
            <LogoPair src="logos/cognito.png" alt="Cognito" text="Cognito" />
            <LogoPair src="logos/supabase.png" alt="Supabase" text="Supabase" />
            <LogoPair src="logos/firebase.png" alt="Firebase" text="Firebase" />
          </div>

          {/* The author of OAuth 2.0 quit the spec. */}
          <Quote tone="error" cite='Eran Hammer, lead author & editor of OAuth 2.0 — "OAuth 2.0 and the Road to Hell" (2012)' className="text-lg md:text-2xl">
            OAuth 2.0 is a bad protocol. WS-* bad. It is bad enough that I no longer want to be associated with it.
          </Quote>
          <p className="text-xl text-gray-500 font-bold tracking-widest uppercase">The man who wrote it walked away. You cannot.</p>
        </div>
      </Section>

      {/* Section 4: B2B Enterprise */}
      <Section className="border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center space-y-16 w-full">
          <h2 className="huge-text">Then B2B happens.</h2>
          <p className="text-2xl md:text-4xl text-gray-300">
            An Enterprise customer says:
          </p>
          <Quote className="max-w-4xl text-xl md:text-3xl">
            We only use Corporate SSO. Can you just connect to our Active Directory?
          </Quote>
          <p className="text-xl md:text-2xl text-gray-400">
            You start with <span className="text-white font-bold bg-zinc-800 px-2 py-1">LDAP</span>. It's horrible. <br className="hidden md:block"/>
            Then they ask for <span className="text-white font-bold bg-zinc-800 px-2 py-1">SAML</span>. You learn XML again.<br className="hidden md:block"/>
            Finally, everyone agrees on <span className="text-white font-bold bg-zinc-800 px-2 py-1">OIDC</span> Federation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            <LogoPair src="logos/ldap.png" alt="OpenLDAP" text="LDAP" />
            <LogoPair src="logos/okta.png" alt="Okta" text="Okta" />
            <LogoPair src="logos/pingidentity.png" alt="PingIdentity" text="PingIdentity" />
            <LogoPair src="logos/zitadel.png" alt="Zitadel" text="Zitadel" />
          </div>
          <p className="text-xl text-gray-500 font-bold uppercase">Identity Providers orchestration begins. You survive.</p>
        </div>
      </Section>

      {/* Section 4.5: The SSO Tax */}
      <Section className="bg-neutral-950 border-t border-neutral-900 border-dashed">
        <div className="max-w-4xl mx-auto text-center space-y-10 w-full">
          <h2 className="huge-text text-[var(--color-warning)]">Then you check the invoice.</h2>
          <p className="text-xl md:text-2xl text-gray-300">
            SSO is a basic security control. Vendors put it behind the
            <span className="text-white font-bold"> "Enterprise" </span> tier and charge accordingly.
            <br />The community named the practice: the <span className="text-white font-bold">SSO tax</span>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl mx-auto font-mono text-left border border-zinc-800 text-sm md:text-base">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-xs tracking-widest">
                  <th scope="col" className="p-3">Vendor</th>
                  <th scope="col" className="p-3">Without SSO</th>
                  <th scope="col" className="p-3 text-[var(--color-error)]">With SSO</th>
                  <th scope="col" className="p-3 text-right">Markup</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  { v: 'Appsmith', a: '$15', b: '$2,500', up: '16,567%' },
                  { v: 'Railway', a: '$20', b: '$2,000', up: '9,900%' },
                  { v: 'Mixpanel', a: '$20', b: '$833', up: '4,065%' },
                ].map((r) => (
                  <tr key={r.v} className="border-b border-zinc-900 last:border-0">
                    <th scope="row" className="p-3 text-white font-bold text-left">{r.v}</th>
                    <td className="p-3">{r.a}/mo</td>
                    <td className="p-3 text-[var(--color-error)] font-bold">{r.b}/mo</td>
                    <td className="p-3 text-right text-[var(--color-warning)] font-bold">+{r.up}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Quote tone="terminal" cite="sso.tax — the SSO Wall of Shame" className="max-w-2xl text-lg md:text-xl">
            Security shouldn't be a premium feature.
          </Quote>
        </div>
      </Section>

      {/* Section 4.7: JWT footgun */}
      <Section className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto text-center space-y-10 w-full">
          <h2 className="huge-text text-[var(--color-error)]">At least the tokens are safe.</h2>
          <p className="text-xl md:text-2xl text-gray-300">
            You issue <span className="text-white font-bold">JWTs</span>. Signed. Verified. Airtight.
            <br />Then you read the spec.
          </p>
          <pre className="max-w-md mx-auto bg-zinc-900 border border-[var(--color-error)] font-mono text-left text-sm md:text-base p-5 rounded-sm shadow-[0_0_24px_rgba(255,0,0,0.25)] overflow-x-auto"><code className="language-json">
            <span className="text-zinc-500">{'{'}</span>{'\n  '}
            <span className="text-[var(--color-warning)]">"alg"</span>{': '}
            <span className="text-[var(--color-error)] font-bold">"none"</span>{',\n  '}
            <span className="text-[var(--color-warning)]">"admin"</span>{': '}
            <span className="text-[var(--color-terminal)]">true</span>{'\n'}
            <span className="text-zinc-500">{'}'}</span>
          </code></pre>
          <p className="text-lg md:text-xl text-gray-400">
            JWT has a mode where the signature is <span className="text-white font-bold">optional</span>.
            Vulnerable libraries accepted an unsigned token as valid.
            <br />This is, allegedly, a feature.
          </p>
        </div>
      </Section>

      {/* Section 5: Authorization - RBAC */}
      <Section className="bg-neutral-950 border-t border-neutral-900 border-dashed">
        <div className="max-w-5xl mx-auto text-center space-y-16 w-full">
          <h2 className="huge-text text-[var(--color-warning)]">Wait. Who can do what?</h2>
          <p className="text-xl md:text-3xl text-gray-300">
            Authentication is solved. Now you need Authorization.
            <br/><br/>
            You implement <span className="font-bold border-b-2 border-white">RBAC</span> (Role-Based Access Control).
          </p>

          <div className="grid grid-cols-2 gap-6 pt-12 max-w-2xl mx-auto">
            <LogoPair src="logos/keycloak.png" alt="Keycloak" text="Keycloak" />
            <LogoPair src="logos/clerk.png" alt="Clerk" text="Clerk" />
          </div>
          <p className="text-xl text-gray-500 font-bold uppercase">Admin, Editor, Viewer. Simple.</p>
        </div>
      </Section>

      {/* Section 6: ABAC */}
      <Section className="border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center space-y-16 w-full">
          <h2 className="huge-text text-[var(--color-error)]">RBAC IS DEAD.</h2>
          <p className="text-xl md:text-3xl text-gray-300">
            Your CEO drops this requirement:
          </p>
          <Quote className="max-w-4xl text-xl md:text-2xl py-6">
            A manager can edit a document ONLY IF the document belongs to their department AND they are accessing it during business hours AND their account is not flagged.
          </Quote>
          <p className="text-xl md:text-2xl text-gray-400">
            Roles aren't enough. You need Attributes. <br className="md:hidden"/> Enter <span className="bg-[var(--color-error)] text-white px-2 py-1 font-bold inline-block mt-4 md:mt-0">ABAC</span>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            <LogoPair src="logos/open-policy-agent.png" alt="OPA" text="Open Policy Agent" />
            <LogoPair src="logos/cedar.png" alt="Cedar" text="Cedar" />
            <LogoPair src="logos/casbin.png" alt="Casbin" text="Casbin" />
            <LogoPair src="logos/oso.png" alt="Oso" text="Oso" />
          </div>
          <p className="text-xl text-gray-500 font-bold uppercase">You write Rego. You write Cedar. You write Polar.</p>
        </div>
      </Section>

      {/* Section 7: ReBAC */}
      <Section className="bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center space-y-16 w-full">
          <h2 className="huge-text text-[var(--color-terminal)]">What about Sharing?</h2>
          <p className="text-xl md:text-3xl text-gray-300">
            A user asks:
          </p>
          <Quote tone="error" className="max-w-4xl text-xl md:text-2xl py-6">
            I want to share this specific nested folder with exactly two external contractors, but they can only view documents that were created before Tuesday.
          </Quote>
          <p className="text-xl md:text-3xl text-gray-400">
            Welcome to Relationships. Welcome to <span className="border-b-2 border-white font-bold text-white">ReBAC</span>.<br/><br/>
            Google wrote a paper called "Zanzibar" and now it's your problem.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            <LogoPair src="logos/google-zanzibar.png" alt="Zanzibar" text="Google Zanzibar" />
            <LogoPair src="logos/spicedb.png" alt="SpiceDB" text="SpiceDB" />
            <LogoPair src="logos/openfga.png" alt="OpenFGA" text="OpenFGA" />
            <LogoPair src="logos/permify.png" alt="Permify" text="Permify" />
          </div>
        </div>
      </Section>

      {/* Section 8: Machine Auth Diagram */}
      <MachineAuthSection />

      {/* Section 9: The Count */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center p-8 border-t border-zinc-900 bg-black text-center">
        <m.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 16 }}
          className="max-w-4xl"
        >
          <p className="text-2xl md:text-4xl text-gray-500 font-bold uppercase tracking-widest mb-8">You now manage</p>
          <StatCounter
            target={14}
            duration={1800}
            className="block text-[clamp(4rem,15vw,9rem)] font-black text-[var(--color-error)] leading-none mb-8"
          />
          <p className="text-2xl md:text-4xl text-white font-bold uppercase tracking-widest">identity providers.</p>
        </m.div>
      </section>

      {/* Section 9.5: Okta — you outsourced to the experts */}
      <Section className="bg-neutral-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center space-y-10 w-full">
          <h2 className="huge-text text-white">So you outsource it to the experts.</h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Okta buys Auth0 for
            <StatCounter target={6.5} prefix=" $" suffix="B " duration={1600} className="text-[var(--color-terminal)] font-bold font-mono" />
            and runs identity for the world. You are in safe hands.
          </p>
          <Quote tone="error" cite="Okta support-system breach, 2023" className="max-w-3xl text-lg md:text-2xl">
            Attackers stole session tokens from support tickets. Okta first said &lt;1% of customers.
            It later admitted the report exposed 100% of its support users — and its own customers
            detected the breach before Okta did.
          </Quote>
          <p className="text-xl text-gray-500 font-bold tracking-widest uppercase">The experts, too, just wanted a login form.</p>
        </div>
      </Section>

      {/* Section 10: Timeline */}
      <Timeline />

      {/* Section 11: OWASP #1 — after all of this */}
      <Section className="border-t border-neutral-900 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-10 w-full">
          <p className="text-2xl md:text-4xl text-gray-500 font-bold uppercase tracking-widest">
            Passwords. OAuth. SAML. RBAC. ABAC. ReBAC. A service mesh.
          </p>
          <p className="text-xl md:text-2xl text-gray-300">And the #1 web vulnerability in the world is still:</p>
          <div className="border border-[var(--color-error)] bg-red-950/20 p-8">
            <div className="text-sm text-zinc-500 uppercase tracking-widest mb-3">OWASP Top 10 · A01:2021</div>
            <div className="text-4xl md:text-6xl font-black text-[var(--color-error)] uppercase leading-none">
              Broken Access Control
            </div>
            <div className="text-gray-400 mt-5 text-base md:text-lg">
              Found in <StatCounter target={94} suffix="%" duration={1600} className="text-white font-bold font-mono" /> of tested applications.
            </div>
          </div>
          <p className="text-xl text-gray-500 font-bold tracking-widest uppercase">You built all of it. It's still broken.</p>
        </div>
      </Section>

      {/* Section 12: Resignation */}
      <Section className="bg-neutral-950 border-t border-zinc-900 border-dashed">
        <h2 className="text-3xl md:text-5xl mb-24 text-gray-500 font-bold uppercase tracking-widest text-center max-w-4xl">So you do what you have to do.</h2>
        <CodeBlock />
      </Section>

      {/* Footer */}
      <footer className="py-24 bg-black text-center border-t border-zinc-900 border-dashed flex flex-col items-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest leading-loose">
          Made with frustration by a security developer. <br/>
          Please don't ask me about Auth.
        </p>
        <a href="https://github.com/kanywst/i-just-wanted-a-login-form" className="mt-8 text-[var(--color-terminal)] hover:text-white border-b border-[var(--color-terminal)] hover:border-white transition-colors text-sm font-bold tracking-widest p-1">
          VIEW SOURCE ON GITHUB
        </a>
      </footer>
    </>
  );
}

export default App;
