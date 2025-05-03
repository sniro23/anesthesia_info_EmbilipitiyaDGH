
import React from 'react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Resources & Information</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        Additional resources, leaflets, and information to help you understand anaesthesia and prepare for your procedure.
      </p>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Downloadable Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resource Card 1 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">You & Your Anaesthetic</h3>
                <p className="text-neutral-dark mb-4">
                  A comprehensive guide explaining general anaesthesia, its effects, and what to expect during your hospital stay.
                </p>
                <a 
                  href="https://www.rcoa.ac.uk/patients/patient-information-resources/patient-information-leaflets-video-resources/you-your-anaesthetic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo text-white font-medium py-2 px-4 rounded-lg inline-block hover:bg-indigo-light transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
            
            {/* Resource Card 2 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Your Spinal Anaesthetic</h3>
                <p className="text-neutral-dark mb-4">
                  Information about spinal anaesthesia, including benefits, risks, and what to expect during and after the procedure.
                </p>
                <a 
                  href="https://www.rcoa.ac.uk/patients/patient-information-resources/patient-information-leaflets-video-resources/your-spinal-anaesthetic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo text-white font-medium py-2 px-4 rounded-lg inline-block hover:bg-indigo-light transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
            
            {/* Resource Card 3 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Caring for Someone Recovering from GA</h3>
                <p className="text-neutral-dark mb-4">
                  Guidance for family members and caregivers helping someone recover from general anaesthesia at home.
                </p>
                <a 
                  href="https://www.rcoa.ac.uk/patients/patient-information-resources/patient-information-leaflets-video-resources/caring-for-someone-recovering-from-ga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo text-white font-medium py-2 px-4 rounded-lg inline-block hover:bg-indigo-light transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
            
            {/* Resource Card 4 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Your Airway</h3>
                <p className="text-neutral-dark mb-4">
                  Information about airway management during anaesthesia and what to expect regarding breathing tubes.
                </p>
                <a 
                  href="https://www.rcoa.ac.uk/patients/patient-information-resources/patient-information-leaflets-video-resources/your-airway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo text-white font-medium py-2 px-4 rounded-lg inline-block hover:bg-indigo-light transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
            
            {/* Resource Card 5 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Child Anaesthetic Risks</h3>
                <p className="text-neutral-dark mb-4">
                  Visual guide explaining the risks associated with anaesthesia in children, with helpful infographics.
                </p>
                <a 
                  href="https://www.rcoa.ac.uk/sites/default/files/documents/2024-12/Child-Infographics2022_0.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo text-white font-medium py-2 px-4 rounded-lg inline-block hover:bg-indigo-light transition-colors"
                >
                  View Infographic
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Helpful Websites</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold">Royal College of Anaesthetists</h3>
                <p className="text-neutral-dark mt-1">Patient information resources from the UK's professional body for anaesthetists.</p>
                <a 
                  href="https://www.rcoa.ac.uk/patients" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo hover:text-indigo-light font-medium mt-1 inline-block"
                >
                  Visit website
                </a>
              </li>
              <li>
                <h3 className="text-xl font-semibold">American Society of Anesthesiologists</h3>
                <p className="text-neutral-dark mt-1">Patient education resources from the American professional organization for anesthesiologists.</p>
                <a 
                  href="https://www.asahq.org/madeforthismoment" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo hover:text-indigo-light font-medium mt-1 inline-block"
                >
                  Visit website
                </a>
              </li>
              <li>
                <h3 className="text-xl font-semibold">Centre for Perioperative Care</h3>
                <p className="text-neutral-dark mt-1">Resources for patients preparing for surgery, including fasting guidelines.</p>
                <a 
                  href="https://cpoc.org.uk/patients" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo hover:text-indigo-light font-medium mt-1 inline-block"
                >
                  Visit website
                </a>
              </li>
            </ul>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-neutral-dark mb-6">
              If you have questions about the information on this website or would like to provide feedback, 
              please use the form below or contact the anaesthesia education team directly.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-neutral-mid rounded-lg focus:ring-2 focus:ring-indigo focus:border-indigo outline-none"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-neutral-mid rounded-lg focus:ring-2 focus:ring-indigo focus:border-indigo outline-none"
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-neutral-mid rounded-lg focus:ring-2 focus:ring-indigo focus:border-indigo outline-none"
                  placeholder="Your question or feedback"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-indigo hover:bg-indigo-light text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;
