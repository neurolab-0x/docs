import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introduction - NeuroLab Documentation',
  description:
    'Welcome to the NeuroLab documentation. Learn how to build powerful neurotechnology applications.',
}

export default function DocsPage() {
  return (
    <div className='prose prose-neutral dark:prose-invert max-w-none'>
      <h1 className='mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Introduction
      </h1>

      <p>
        Welcome to the NeuroLab documentation. NeuroLab is a sophisticated
        multimodal analysis platform that combines EEG (Electroencephalogram)
        data processing with voice emotion detection to provide comprehensive
        mental state classification.
      </p>

      <h2>What is NeuroLab?</h2>

      <p>
        NeuroLab is a production-grade healthcare/neurotechnology platform
        designed for:
      </p>

      <ul>
        <li>
          <strong>Mental health monitoring</strong> - Track and analyze mental
          states in real-time
        </li>
        <li>
          <strong>Neurofeedback applications</strong> - Provide biofeedback
          based on brain activity
        </li>
        <li>
          <strong>Brain-computer interfaces</strong> - Build BCI applications
          with ML-powered analysis
        </li>
        <li>
          <strong>Clinical decision support</strong> - Assist healthcare
          professionals with data-driven insights
        </li>
        <li>
          <strong>Research applications</strong> - Collect and analyze EEG and
          voice data for studies
        </li>
      </ul>

      <h2>Key Features</h2>

      <h3>Real-time EEG Processing</h3>
      <p>
        Stream and analyze EEG data in real-time with advanced signal processing
        and machine learning models.
      </p>

      <h3>Voice Emotion Detection</h3>
      <p>
        Analyze audio recordings to detect emotions and map them to mental
        states using TensorFlow-based models.
      </p>

      <h3>Multimodal Analysis</h3>
      <p>
        Combine EEG and voice data for comprehensive mental state assessment
        with higher accuracy.
      </p>

      <h3>Mental State Classification</h3>
      <p>Identify three primary mental states:</p>
      <ul>
        <li>
          <strong>Relaxed</strong> (State 0) - Calm, neutral emotional states
        </li>
        <li>
          <strong>Focused</strong> (State 1) - Alert, positive, engaged states
        </li>
        <li>
          <strong>Stressed</strong> (State 2) - Anxious, fearful, negative
          states
        </li>
      </ul>

      <h3>Model Interpretability</h3>
      <p>
        Understand model predictions with SHAP and LIME explanations for
        transparency and trust.
      </p>

      <h3>Clinical Features</h3>
      <p>
        Complete clinical workflow support including appointments, patient
        management, session tracking, and billing.
      </p>

      <h2>Architecture Overview</h2>

      <p>NeuroLab uses a three-tier microservices architecture:</p>

      <pre>
        <code>{`Frontend (React/Next.js)
    ↓
Backend API (Express.js/Node.js)
    ↓
AI Service (FastAPI/Python)
    ↓
Databases (MongoDB, Redis, InfluxDB)`}</code>
      </pre>

      <h3>Technology Stack</h3>

      <p>
        <strong>AI/ML Service:</strong>
      </p>
      <ul>
        <li>FastAPI for REST API</li>
        <li>TensorFlow/Keras for deep learning</li>
        <li>MNE for EEG signal processing</li>
        <li>librosa for audio processing</li>
        <li>SHAP/LIME for interpretability</li>
      </ul>

      <p>
        <strong>Backend API:</strong>
      </p>
      <ul>
        <li>Express.js for REST API</li>
        <li>MongoDB for data storage</li>
        <li>Redis for caching</li>
        <li>Socket.io for real-time communication</li>
        <li>MQTT for IoT device integration</li>
      </ul>

      <p>
        <strong>Frontend:</strong>
      </p>
      <ul>
        <li>React 18 with TypeScript</li>
        <li>Next.js 16 for e-commerce</li>
        <li>Tailwind CSS for styling</li>
        <li>shadcn/ui components</li>
      </ul>

      <h2>Getting Started</h2>

      <p>Ready to dive in? Check out these resources:</p>

      <ul>
        <li>
          <a href='/docs/quick-start'>Quick Start</a> - Get up and running in
          minutes
        </li>
        <li>
          <a href='/docs/architecture'>Architecture</a> - Understand the system
          design
        </li>
        <li>
          <a href='/docs/installation/docker'>Installation</a> - Deploy with
          Docker
        </li>
        <li>
          <a href='/docs/api'>API Reference</a> - Explore the API endpoints
        </li>
      </ul>

      <h2>Use Cases</h2>

      <h3>Healthcare Providers</h3>
      <p>
        Monitor patient mental states during therapy sessions, track progress
        over time, and generate comprehensive reports.
      </p>

      <h3>Researchers</h3>
      <p>
        Collect EEG and voice data, train custom models, and analyze results
        with built-in statistical tools.
      </p>

      <h3>Developers</h3>
      <p>
        Integrate NeuroLab into your applications using REST APIs, WebSocket
        streaming, or MQTT for IoT devices.
      </p>

      <h3>Wellness Applications</h3>
      <p>
        Build meditation apps, focus trainers, or stress management tools with
        real-time biofeedback.
      </p>

      <h2>Support</h2>

      <p>Need help? Here&apos;s how to get support:</p>

      <ul>
        <li>
          Check the <a href='/docs'>documentation</a>
        </li>
        <li>
          Review <a href='/docs/guides'>API examples</a>
        </li>
        <li>
          Open an issue on <a href='https://github.com/neurolab'>GitHub</a>
        </li>
        <li>Contact the team</li>
      </ul>

      <h2>Next Steps</h2>

      <div className='not-prose mt-6 grid gap-4 sm:grid-cols-2'>
        <a
          href='/docs/quick-start'
          className='hover:bg-accent block rounded-lg border p-6 transition-colors'
        >
          <h3 className='mb-2 font-bold'>Quick Start →</h3>
          <p className='text-muted-foreground text-sm'>
            Install and run NeuroLab in minutes
          </p>
        </a>
        <a
          href='/docs/architecture'
          className='hover:bg-accent block rounded-lg border p-6 transition-colors'
        >
          <h3 className='mb-2 font-bold'>Architecture →</h3>
          <p className='text-muted-foreground text-sm'>
            Learn about the system design
          </p>
        </a>
      </div>
    </div>
  )
}
