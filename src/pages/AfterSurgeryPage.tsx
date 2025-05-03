
import React from 'react';
import QASection from '@/components/QASection';

const AfterSurgeryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">After Surgery</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        Understanding what to expect after your procedure can help you prepare for recovery and recognize normal versus abnormal symptoms.
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection question="What happens in the recovery room?" defaultOpen={true}>
          <p>
            After your surgery, you'll be transferred to the Post-Anaesthesia Care Unit (PACU), 
            also called the recovery room. This is a specialized area where you'll be closely monitored as you 
            emerge from anaesthesia.
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold">In the PACU, you can expect:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Continuous monitoring</strong> of your vital signs (blood pressure, heart rate, oxygen levels)
              </li>
              <li>
                <strong>One-to-one nursing care</strong> until you're fully awake and stable
              </li>
              <li>
                <strong>Regular assessments</strong> of your pain levels and administration of pain medication as needed
              </li>
              <li>
                <strong>Oxygen therapy</strong> via a face mask or nasal prongs if required
              </li>
              <li>
                <strong>Warming blankets</strong> if you're cold or shivering
              </li>
              <li>
                <strong>IV fluids</strong> until you're able to drink
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">How long will I stay in recovery?</h4>
            <p>
              Most patients stay in the PACU for 30 minutes to 2 hours, depending on:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The type of surgery and anaesthesia you received</li>
              <li>How quickly you wake up and become stable</li>
              <li>How well your pain and any nausea are controlled</li>
              <li>If there were any complications during surgery</li>
            </ul>
            <p className="mt-2">
              You'll be transferred to a ward or discharged home once the recovery team is satisfied with your condition.
            </p>
          </div>
        </QASection>

        <QASection question="Common post-op side effects & pain control">
          <div>
            <h4 className="font-semibold">Common Side Effects:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Sore throat</strong> - From the breathing tube; usually resolves within 24-48 hours
              </li>
              <li>
                <strong>Nausea and vomiting</strong> - Can be treated with anti-sickness medications
              </li>
              <li>
                <strong>Dizziness</strong> - Often improves with gentle movement and hydration
              </li>
              <li>
                <strong>Drowsiness</strong> - Gradually improves as anaesthesia wears off
              </li>
              <li>
                <strong>Shivering</strong> - Usually temporary; treated with warming blankets
              </li>
              <li>
                <strong>Confusion</strong> - More common in older adults; usually temporary
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Pain Management Options:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>IV pain medications</strong> - Often opioids like morphine for immediate relief
              </li>
              <li>
                <strong>Patient-Controlled Analgesia (PCA)</strong> - Allows you to self-administer small doses of pain medication by pressing a button
              </li>
              <li>
                <strong>Oral pain medications</strong> - Pills or liquids once you can drink fluids
              </li>
              <li>
                <strong>Regional blocks</strong> - May continue to provide pain relief for hours after surgery
              </li>
              <li>
                <strong>Local anaesthetic infiltration</strong> - Injected around the surgical site
              </li>
              <li>
                <strong>Non-medication techniques</strong> - Ice packs, positioning, relaxation techniques
              </li>
            </ul>
          </div>
          
          <div className="mt-4 bg-neutral-light p-4 rounded-lg">
            <h4 className="font-semibold">Important Pain Management Tips:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Don't wait until pain is severe before requesting pain relief</li>
              <li>Rate your pain on a scale from 0-10 when asked by healthcare staff</li>
              <li>Tell your nurses if pain medication isn't working or wears off quickly</li>
              <li>Report any unusual symptoms or side effects from pain medications</li>
            </ul>
          </div>
        </QASection>

        <QASection question="When can I eat and drink?">
          <p>
            Returning to eating and drinking after surgery depends on several factors including the type of surgery, 
            anaesthesia used, and your individual recovery.
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold">General Guidelines:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Clear fluids</strong> (water, apple juice) - Often allowed within 2-4 hours after fully waking from anaesthesia, 
                once you can swallow safely
              </li>
              <li>
                <strong>Light foods</strong> (crackers, toast, soup) - Usually permitted once you're tolerating fluids well, 
                often 4-6 hours after surgery
              </li>
              <li>
                <strong>Regular diet</strong> - Typically resumed gradually as tolerated, often by the next day for minor surgeries
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Special Considerations:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Abdominal surgery</strong> - May require waiting until bowel sounds return and gas or bowel movements occur
              </li>
              <li>
                <strong>Throat or mouth surgery</strong> - May require special dietary restrictions
              </li>
              <li>
                <strong>Nausea or vomiting</strong> - May delay return to eating until symptoms improve
              </li>
              <li>
                <strong>Some medications</strong> - May need to be taken with food, affecting when you can restart them
              </li>
            </ul>
            <p className="mt-4 text-sm bg-amber/10 p-3 rounded-lg border border-amber">
              Always follow your healthcare provider's specific instructions about eating and drinking after your procedure. 
              Start slowly and increase gradually as tolerated.
            </p>
          </div>
        </QASection>

        <QASection question="Discharge instructions & follow-up">
          <div>
            <h4 className="font-semibold">Common Discharge Instructions:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Activity restrictions</strong> - When you can return to normal activities, driving, work, and exercise
              </li>
              <li>
                <strong>Wound care</strong> - How to clean and dress the surgical site
              </li>
              <li>
                <strong>Medication instructions</strong> - When and how to take prescribed medications
              </li>
              <li>
                <strong>Signs of infection</strong> - What to watch for (increased pain, redness, swelling, discharge, fever)
              </li>
              <li>
                <strong>Diet guidelines</strong> - Any special dietary requirements during recovery
              </li>
              <li>
                <strong>Showering/bathing</strong> - When it's safe to get the surgical area wet
              </li>
              <li>
                <strong>Contact information</strong> - Who to call if you have questions or problems
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Follow-up Appointments:</h4>
            <p>
              Your discharge instructions will include details about follow-up visits. Typically, you'll have:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>An appointment with your surgeon to check your healing</li>
              <li>Instructions for any suture or staple removal</li>
              <li>Information about any required physical therapy</li>
            </ul>
            <p className="mt-2">
              Be sure to keep all follow-up appointments, even if you're feeling well.
            </p>
          </div>
          
          <div className="mt-4 bg-amber/10 p-4 rounded-lg border border-amber">
            <h4 className="font-semibold">When to Seek Immediate Medical Attention:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Difficulty breathing or shortness of breath</li>
              <li>Chest pain or irregular heartbeat</li>
              <li>Severe pain not controlled by prescribed medications</li>
              <li>Excessive bleeding or wound drainage</li>
              <li>Signs of infection (fever above 38°C/100.4°F, increasing redness or warmth)</li>
              <li>Inability to urinate within 8-10 hours after surgery</li>
              <li>Persistent nausea and vomiting</li>
              <li>Calf pain, swelling, or redness (possible blood clot)</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <p className="font-semibold">Recovery Pathway:</p>
            <p>
              Your recovery will follow a general pattern, but everyone heals at their own pace. Be patient with your body 
              and follow all medical advice to ensure the best outcome.
            </p>
            <p className="mt-2">
              Keep your discharge instructions in an easily accessible place and bring them with you to follow-up appointments.
            </p>
          </div>
        </QASection>
      </div>
    </div>
  );
};

export default AfterSurgeryPage;
