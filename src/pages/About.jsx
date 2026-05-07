import Button from '../components/ui/Button';
import FadeIn from '../components/ui/FadeIn';

export default function About() {
  return (
    <div className="section-padding">
      <div className="container-main max-w-4xl">
        <FadeIn>
          <p className="font-accent text-sage text-lg mb-2">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal mb-8">
            About the Practitioner
          </h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="aspect-[3/4] rounded-2xl bg-sand overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=800&fit=crop"
                alt="Practitioner"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <div className="space-y-6 text-charcoal/70 leading-relaxed">
              <p>
                With over a decade of experience in holistic wellness, I believe in treating the whole
                person — mind, body, and spirit. My practice combines ancient wisdom with modern
                science to create transformative healing experiences.
              </p>
              <p>
                My journey began with a deep curiosity about the connection between physical health
                and emotional well-being. Through years of study and practice, I've developed an
                integrative approach that honors each individual's unique path to wellness.
              </p>
              <p>
                Whether through one-on-one consulting, immersive retreats, or carefully curated
                wellness products, my mission is to empower you with the tools and knowledge to live
                your most vibrant life.
              </p>
              <Button to="/services">Explore Services</Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
