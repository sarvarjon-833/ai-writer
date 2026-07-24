import {
  SparklesIcon,
  PaintBrushIcon,
  ChartBarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI Content Generation',
    description: 'Instantly generate complete, unique blog posts and articles.',
    icon: SparklesIcon,
  },
  {
    name: 'Tone & Style Adaptation',
    description:
      'Select from formal, professional, casual, or persuasive writing tones.',
    icon: PaintBrushIcon,
  },
  {
    name: 'SEO Optimization Tools',
    description:
      'Analyze and optimize content for search visibility and keyword usage.',
    icon: ChartBarIcon,
  },
  {
    name: 'Multilingual Support',
    description:
      'Generate and translate content in over 30 languages seamlessly.',
    icon: GlobeAltIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-700">
            Elevate your writing flow
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Unleash your creative potential with AI
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Instantly generate high-quality blog posts, social media updates,
            articles, and more with our advanced AI. Overcome writer's block and
            save hours of brainstorming.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
