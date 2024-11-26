import { motion } from 'framer-motion';
import Link from 'next/link';

import { DreamcatcherIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <DreamcatcherIcon size={128} />
        </p>
        <p>
          Welcome to the Dreamcatcher Platform, an open-source, decentralized
          ecosystem where{' '}
          <Link className="font-medium underline underline-offset-4" href="#">
            contributors
          </Link>{' '}
          create and share value through natural language applications. This AI
          assistant helps you navigate the platform's capabilities, from
          discovering NApps to understanding decentralized income flows.
        </p>
        <p>
          Whether you're a developer, service provider, or potential user, the
          Dreamcatcher enables you to participate in a unified ecosystem where
          value is fairly attributed and rewarded through automated systems.
          Explore how you can contribute, collaborate, and benefit from this
          innovative platform designed for the future of decentralized value
          creation.
        </p>
      </div>
    </motion.div>
  );
};
