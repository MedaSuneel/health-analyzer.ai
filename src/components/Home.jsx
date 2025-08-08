import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header Welcome Section */}
      <motion.div
        className="p-8 md:flex items-center justify-between gap-8 md:mx-20 "
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800">
            Welcome to <span className="text-green-600">Health Analyzer</span>  Your Intelligent Health Companion
          </h2>
          <p className="text-md md:text-xl mt-4 text-center text-gray-600">
          Take charge of your health with AI-powered precision. Whether you're feeling unwell or simply curious about your well-being, HealthWiseAI is here to guide you. Our intelligent assistant helps you interpret symptoms and analyze medical reports in seconds – offering you personalized, actionable advice that supports early detection and smart self-care. 
          </p>
          <p className="text-md md:text-lg mt-2 text-center text-gray-600">
          No need to search endlessly online or wait in uncertainty — let our AI provide fast, understandable, and reliable feedback tailored just for you. Start your journey toward better health today!
          </p>

        </div>
        <motion.img
          src="/DoctorLogo.jpeg"
          alt="HealthWiseAI"
          className="md:w-1/3 w-full mt-6 md:mt-0 rounded-full shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Feature: Symptom Analyzer */}
      <motion.div
        className="md:flex items-center space-x-50  p-6 md:p-12 md:mx-10 "
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src="/Symptom-image.jpg"
          alt="Symptom Analyzer"
          className="md:w-1/3 rounded-xl "
        />
        <div className="md:w-1/2 mt-6 md:mt-0 ">
          <h2 className="text-3xl text-center font-semibold text-indigo-700 mb-2">🧠 Symptom Analyzer</h2>
          <p className="text-md md:text-lg mt-2 text-gray-600">
            Feeling off but not sure what's wrong? Just type in how you're feeling — like "headache", "chest pain", or "dizziness". Our AI system will analyze the input and instantly classify your condition into one of three key categories:
          </p>
          <ul className=" list-inside mt-2 ml-8 text-gray-600 text-md md:text-lg">
            <li><strong>🟢 General:</strong> Minor issues that usually don't need urgent care, like fatigue or mild cold.</li>
            <li><strong>🟠 Mental Health:</strong> Inputs related to emotional or psychological well-being, such as stress, anxiety, or mood swings.</li>
            <li><strong>🔴 Emergency:</strong> Serious conditions that may require immediate medical attention, like chest pain or severe breathing issues.</li>
          </ul>
          <p className="mt-2 text-md md:text-lg text-gray-600">
            This quick classification helps you make informed decisions about whether to rest, seek support, or visit a healthcare professional immediately.
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/symptom-analyzer"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              <p className='text-lg font-semibold '> Try Symptom Analyzer &nbsp; &rarr;</p>
            </Link>
          </div>

        </div>
      </motion.div>

      {/* Feature: Report Analyzer */}
      <motion.div
        className="md:flex flex-row-reverse items-center gap-40 md:mx-10  p-6 md:p-12"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src="/report-analyzer.jpg"
          alt="Report Analyzer"
          className="md:w-1/3 rounded-xl"
        />
        <div className="md:w-1/2 mt-6 md:mt-0">
           <h2 className="text-3xl text-center font-semibold text-green-700 mb-2">📄 Report Analyzer</h2>
          <p className="text-md md:text-lg mt-2 text-gray-600">
            Got a lab report but struggling to understand all the numbers and terms? Just upload your PDF or image file, and our AI will take care of the rest. It analyzes your report thoroughly and provides:
          </p>
          <ul className=" list-inside mt-2 ml-5 text-gray-600 text-md md:text-lg">
            <li><strong>📊 Parameter Breakdown:</strong> Understand what each test means, what normal ranges look like, and what your values indicate.</li>
            <li><strong>⚠️ Abnormality Detection:</strong> Get notified about any parameters that are outside the healthy range and why that matters.</li>
            <li><strong>🏥 Verdict & Advice:</strong> Receive a plain-language summary of your report’s overall result, whether it’s normal, concerning, or requires urgent attention.</li>
          </ul>
          <p className="mt-2 text-md md:text-lg text-gray-600">
            You’ll no longer need to guess what your health reports mean. HealthWiseAI turns clinical data into simple, understandable health insights – instantly.
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/report-analyzer"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              <p className='text-lg font-semibold '> Try Report Analyzer  &nbsp; &rarr;</p>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="text-center p-4 text-gray-600 border-t mt-6">
        &copy; {new Date().getFullYear()} HealthWiseAI. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
