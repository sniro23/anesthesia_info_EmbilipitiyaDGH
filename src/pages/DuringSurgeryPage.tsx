
import React from 'react';
import QASection from '@/components/QASection';

const DuringSurgeryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">During Surgery</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        Understanding what happens during surgery and how anaesthesia works can help ease anxiety 
        and prepare you for your procedure.
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection question="What types of anaesthesia exist?" defaultOpen={true}>
          <div>
            <h4 className="font-semibold">General Anaesthesia (GA):</h4>
            <p>A medication-induced state of unconsciousness. You'll be completely unaware and unable to feel pain during your procedure.</p>
            <p className="mt-2 text-sm italic">Typically used for: Major surgeries, procedures in body cavities, or when other types aren't suitable.</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Spinal/Epidural Anaesthesia:</h4>
            <p>Injection of local anaesthetic into the subarachnoid space (spinal) or epidural space to block nerve transmission below the waist.</p>
            <p className="mt-2 text-sm italic">Typically used for: Lower body procedures, cesarean sections, hip/knee surgery.</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Peripheral Nerve Blocks:</h4>
            <p>Local anaesthetic injected near specific nerves to numb a particular area of the body.</p>
            <p className="mt-2 text-sm italic">Typically used for: Arm, shoulder, or leg surgeries, providing targeted pain relief.</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Conscious Sedation (Monitored Anaesthesia Care):</h4>
            <p>Medications to help you relax and reduce pain while maintaining consciousness.</p>
            <p className="mt-2 text-sm italic">Typically used for: Minor procedures, endoscopies, dental work.</p>
          </div>
        </QASection>

        <QASection question="How does each type of anaesthesia work?">
          <div>
            <h4 className="font-semibold">General Anaesthesia Mechanics:</h4>
            <p>
              General anaesthesia works through a combination of medications that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Induce unconsciousness (propofol, thiopental)</li>
              <li>Maintain unconsciousness (sevoflurane, desflurane gases)</li>
              <li>Relax muscles (rocuronium, succinylcholine)</li>
              <li>Block pain (fentanyl, morphine)</li>
            </ul>
            <p className="mt-2">
              These medications depress your central nervous system in a controlled manner, affecting different brain receptors to create a reversible state of unconsciousness.
            </p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Spinal/Epidural Mechanics:</h4>
            <p>
              Local anaesthetic (like bupivacaine) is injected near the spinal cord:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Spinal: Directly into the cerebrospinal fluid surrounding the spinal cord</li>
              <li>Epidural: Into the space just outside the spinal cord coverings</li>
            </ul>
            <p className="mt-2">
              The medication blocks sodium channels in nerve membranes, preventing nerve impulses from traveling up the spinal cord to the brain.
            </p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Peripheral Nerve Block Mechanics:</h4>
            <p>
              Using ultrasound guidance, anaesthetists inject local anaesthetic around specific nerve bundles. The medication temporarily blocks nerve transmission in that specific area without affecting consciousness.
            </p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Sedation Mechanics:</h4>
            <p>
              Carefully titrated doses of medications like midazolam (a benzodiazepine) and fentanyl (an opioid) create a state of:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Reduced anxiety</li>
              <li>Decreased pain sensation</li>
              <li>Amnesia (reduced memory of the procedure)</li>
              <li>Maintained consciousness and protective reflexes</li>
            </ul>
          </div>
        </QASection>

        <QASection question="Risks & complications, prevention and management">
          <div>
            <h4 className="font-semibold">Common Minor Effects:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Shivering</strong> (20%) - Prevented with warming blankets</li>
              <li><strong>Post-op nausea and vomiting</strong> (25%) - Managed with antiemetics like ondansetron</li>
              <li><strong>Sore throat</strong> (15%) - Minimized with gentle airway management</li>
              <li><strong>Headache</strong> (10%) - Treated with hydration and mild analgesics</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Regional/Spinal Anaesthesia Risks:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Post-dural puncture headache</strong> (1-2%) - Managed with hydration, caffeine, or epidural blood patch</li>
              <li><strong>Transient neurological symptoms</strong> (0.5%) - Usually resolve with time</li>
              <li><strong>Urinary retention</strong> - Temporary catheterization if needed</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Serious but Rare Complications:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Anaphylaxis</strong> (1 in 10,000) - Identified by monitoring and treated with epinephrine</li>
              <li><strong>Malignant hyperthermia</strong> (< 1 in 50,000) - Genetic condition treated with dantrolene</li>
              <li><strong>Permanent nerve injury</strong> (< 1 in 100,000) - Prevented by careful positioning and technique</li>
              <li><strong>Awareness during general anaesthesia</strong> (< 1 in 1,000) - Monitored using BIS technology</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Airway Complications:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Difficult intubation</strong> (1-3%) - Managed with specialized equipment and techniques</li>
              <li><strong>Aspiration</strong> (< 1%) - Prevented with fasting and rapid sequence induction</li>
              <li><strong>Dental damage</strong> (< 0.5%) - Minimized with careful technique</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              Remember: Your anaesthetist is highly trained to prevent, detect, and manage these complications. The vast majority of anaesthetics are administered without any serious problems.
            </p>
          </div>
        </QASection>

        <QASection question="Monitoring & safety measures">
          <div>
            <h4 className="font-semibold">Standard Monitors (ASA Guidelines):</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>ECG</strong> - Monitors heart rate and rhythm</li>
              <li><strong>NIBP</strong> - Non-invasive blood pressure, typically measured every 3-5 minutes</li>
              <li><strong>SpO₂</strong> - Oxygen saturation via pulse oximeter</li>
              <li><strong>ETCO₂</strong> - End-tidal carbon dioxide to confirm proper breathing</li>
              <li><strong>Temperature</strong> - To detect and prevent hypothermia or hyperthermia</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Advanced Monitoring (as needed):</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Arterial line</strong> - For continuous blood pressure monitoring</li>
              <li><strong>Central venous pressure</strong> - For complex cases or critically ill patients</li>
              <li><strong>Neuromuscular blockade monitors</strong> - To ensure appropriate muscle relaxation</li>
              <li><strong>BIS (Bispectral Index)</strong> - To monitor depth of anaesthesia</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Normal Target Values:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>SpO₂:</strong> > 95%</li>
              <li><strong>ETCO₂:</strong> 35-45 mmHg</li>
              <li><strong>MAP (Mean Arterial Pressure):</strong> 65-90 mmHg</li>
              <li><strong>Temperature:</strong> 36-37°C (97-99°F)</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Safety Protocols:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Pre-anaesthetic equipment checks using standardized checklists</li>
              <li>WHO Surgical Safety Checklist before incision</li>
              <li>Immediate access to emergency drugs and equipment</li>
              <li>Continuous visual and auditory alarms for vital sign deviations</li>
              <li>Capnography to confirm correct breathing tube placement</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              Modern anaesthesia monitoring has dramatically improved safety. Your vital signs are continuously displayed 
              and monitored throughout your procedure by your anaesthesia team.
            </p>
          </div>
        </QASection>

        <QASection question="Role of the anaesthetist during surgery">
          <p>
            Your anaesthetist is a specially trained doctor who remains with you throughout your entire surgery, 
            focusing exclusively on your safety and comfort.
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold">The anaesthetist's responsibilities include:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Continuous assessment</strong> of vital signs, anaesthetic depth, pain control, and fluid status
              </li>
              <li>
                <strong>Dynamic medication adjustments</strong> throughout surgery based on your needs and surgical requirements
              </li>
              <li>
                <strong>Managing unexpected events</strong> like blood pressure changes, arrhythmias, or bleeding
              </li>
              <li>
                <strong>Coordinating with surgeons</strong> about timing, positioning, and special requirements
              </li>
              <li>
                <strong>Patient advocacy</strong>, ensuring your safety, dignity, and comfort at all times
              </li>
              <li>
                <strong>Making clinical decisions</strong> about blood transfusions, fluid management, and pain control
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Team Approach:</h4>
            <p>
              Your anaesthetist often works with a team that may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Anaesthesia assistants or technicians</li>
              <li>Nurse anaesthetists (in some countries)</li>
              <li>Anaesthesia trainees under supervision</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              Think of your anaesthetist as your personal "life functions manager" during surgery, constantly monitoring and 
              adjusting to ensure your body's systems remain stable while you're unconscious or sedated.
            </p>
          </div>
        </QASection>
      </div>
    </div>
  );
};

export default DuringSurgeryPage;
