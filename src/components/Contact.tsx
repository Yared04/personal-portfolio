import React from 'react';
import Image from 'next/image';
import { Title } from './Title';
import { Button } from './ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <Title title="Let's Work Together" />

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to bring your ideas to life?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            I&apos;m always open to discussing new projects, creative ideas or opportunities to be
            part of your vision.
          </p>
                  {/* Contact Info */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-row gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <a
                href="mailto:yaredt29@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                yaredt29@gmail.com
              </a>
            </div>
            <p className="text-muted-foreground">|</p>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <a
                href="tel:+251934215094"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                +251 934 215 094
              </a>
            </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Link
                href="https://www.upwork.com/freelancers/yaredt8"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me on{' '}
                <Image
                  src="/icons/upwork.svg"
                  alt="Upwork"
                  width={60}
                  height={60}
                  className="ml-2"
                />
              </Link>
            </Button>
            <Button onClick={() => window.location.href = 'mailto:yaredt29@gmail.com'} size="lg" variant="outline" className="text-lg px-8 py-6">
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="max-w-xl mx-auto">
          <div className="flex sm:flex-row flex-col justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <GitHubLogoIcon className="w-5 h-5 text-primary" />
              <a
                href="https://github.com/Yared04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LinkedInLogoIcon className="w-5 h-5 text-primary" />
              <a
                href="https://linkedin.com/in/yared04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z" />
              </svg>
              <a
                href="https://www.upwork.com/freelancers/yaredt8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                Upwork
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
