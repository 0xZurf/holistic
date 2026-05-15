import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { ulid } from 'ulid';
import { getClient } from './client.js';

const now = new Date().toISOString();

const offerings = [
  {
    slug: 'eft-tapping',
    title: 'Tapping — EFT',
    description:
      'Emotional Freedom Techniques with sacred intention. Two fingers, ancient meridian points, and the nervous system finally gets to rest.',
    category: 'Energy Healing',
    price: 33300,
    price_label: '$333 / session · 5-pack $1,111',
    duration: '60–75 minutes',
    sort_order: 0,
    body: `
<h2>What If the Thing Holding You Back Isn't a Mindset Problem?</h2>
<p>You have done the work. You have journaled, prayed, meditated, set intentions, spoken affirmations, attended the retreats, read the books. And still — something persists. A pattern that returns. A fear that won't fully release. An emotion that spikes when it shouldn't. A memory that still has its teeth in you.</p>
<p>This is not a failure of your willpower or your faith. <strong>This is biology.</strong></p>
<p>The patterns that won't shift are often not stored in thought — they are stored in the body. In the nervous system. In the electrical charge of a memory that never got fully processed. In stress hormones that were never metabolized. In a threat response that was never told it was safe to stand down.</p>
<p>EFT — Emotional Freedom Techniques — also known as tapping — is one of the most researched and clinically validated tools available for reaching those places. Not through years of talk therapy. Not through re-traumatization. Through the precise, gentle stimulation of specific points on the body — the same meridian points used in acupuncture for thousands of years — while simultaneously bringing conscious awareness to what needs to be released.</p>
<p>The results, documented across more than 300 peer-reviewed studies in 12 countries, are often described the same way: faster than expected. More lasting than expected. And unlike anything that came before it.</p>

<h2>The Science — What Is Actually Happening</h2>
<p>EFT is not a belief system. You do not have to believe it will work for it to work. The mechanisms are physiological, documented, and now published in some of the most rigorous scientific journals in the world.</p>

<h3>The Amygdala Receives a Direct Signal to Stand Down</h3>
<p>Tapping on specific acupoints during the recall of distressing memories sends electrochemical signals through peripheral nerves and connective tissue to brain regions involved in threat detection and emotional regulation, including the amygdala, hippocampus, and prefrontal cortex. This stimulation rapidly reduces limbic arousal and promotes a shift from sympathetic activation toward greater parasympathetic activity.</p>
<p>In plain language: the amygdala is the brain's alarm system. It is what fires when you feel anxious, triggered, overwhelmed, or frozen. It does not speak in language. It speaks in sensation. Tapping gives it a signal it understands — through the body, through the meridians — that says: <em>the threat is not real. You are safe. You can release.</em></p>
<p>Most methods try to reason with the amygdala. Tapping speaks its language.</p>

<h3>Cortisol Drops — Measurably, Significantly</h3>
<p>Research demonstrated that EFT reduced cortisol levels by 24%. Along with emotional improvements, resting heart rate went down, blood pressure dropped, and immune function as measured by salivary immunoglobulin A increased. Cortisol dropped by half in participants of a 5-day EFT workshop.</p>
<p>Cortisol is the stress hormone that, in chronic elevation, impairs memory, disrupts sleep, suppresses immunity, accelerates aging, and keeps the body locked in survival mode. It is the chemical signature of a system that does not feel safe. When cortisol drops through tapping, the body is not just relaxed — it is chemically reorganized. The terrain changes.</p>

<h3>Memories Are Neurologically Rewritten — Not Suppressed</h3>
<p>When a distressing memory is reactivated while the client is simultaneously in a state of physiological calm created by the tapping, the brain registers a mismatch between what it expected — distress — and what it is experiencing — relative calm. That prediction error is exactly the condition memory reconsolidation theory says is needed to update the emotional charge of a memory. The tapping does not suppress the memory. It creates the conditions for the memory's emotional associations to be neurologically rewritten.</p>
<p>This is the key distinction from suppression, distraction, or coping. The memory remains — but its charge is gone. What was once a trigger becomes a neutral fact. The story stays. The suffering attached to it does not have to.</p>

<h3>Gene Expression Changes — The Body Rewrites Its Own Code</h3>
<p>EFT tapping produces measurable shifts in biomarkers — including reduced cortisol, enhanced immune function, and changes in gene expression — that correspond with clinical improvements.</p>
<p>Research on gene expression shows that EFT has the documented capacity to down-regulate genes associated with the stress response and up-regulate genes associated with immune function. This is not metaphor. Tapping reaches the level of the cell. The body is not just calmed — it is signaled, at the genetic level, to operate differently.</p>

<h3>The Results Are Durable — and They Come Fast</h3>
<p>More than 99 percent of over 300 studies show statistically significant improvements on at least one targeted symptom or related issue. The clinical trials have consistently led to positive outcomes, often with unusual speed and strong durability.</p>
<p>EFT has been compared directly to EMDR and cognitive behavioral therapy in controlled trials — and shown equivalent effectiveness. What distinguishes it is speed. And the fact that clients can learn to use it themselves, between sessions, for the rest of their lives.</p>

<h2>What We Can Work With</h2>
<p>EFT has documented efficacy across a wide range of conditions. In our sessions, we can work with:</p>
<p><strong>Emotional &amp; Psychological</strong> — Anxiety and chronic worry, depression and low mood, PTSD and complex trauma, phobias and irrational fears, grief and loss, shame and guilt, anger and resentment, emotional reactivity and triggers.</p>
<p><strong>Physical</strong> — Chronic pain and tension held in the body, insomnia and disrupted sleep, fatigue and low energy, physical symptoms of chronic stress, cravings and compulsive patterns, stress-related illness.</p>
<p><strong>Patterns &amp; Blocks</strong> — Scarcity beliefs and blocks around money and abundance, fear of visibility or being seen, imposter syndrome and self-doubt, people-pleasing and boundary dissolution, blocks to creativity, love, or leadership, the feeling of being stuck despite doing everything right.</p>
<p><strong>Integration &amp; Expansion</strong> — Processing psychedelic or plant medicine experiences, anchoring insights from ceremony or retreat, clearing what arose and didn't resolve, building a self-regulation practice that is genuinely yours.</p>

<h2>What a Session Looks Like</h2>
<p>A session is a sacred, private, one-on-one container — held in person or remotely. There is no performance required. No need to have it figured out before you arrive. You bring what is present. We meet it together.</p>
<p>We begin with conversation — identifying what you want to address and how it lives in the body. We find the thread. Then we tap — moving through the specific meridian points while holding conscious, compassionate attention on what needs to be seen and released. Sessions often include ceremonial elements, energetic clearing, and the sacred intention that I bring to all of my work.</p>
<p>Most people feel a noticeable shift within a single session. A lightening. A distance from the charge. A quiet that wasn't there before. Sometimes what releases is something you have been carrying for years. Sometimes it is something you didn't even know was there until the body let it go.</p>

<h2>Investment</h2>
<table>
  <tbody>
    <tr><td>Single session</td><td><strong>$333</strong></td></tr>
    <tr><td>5-session package</td><td><strong>$1,111</strong></td></tr>
  </tbody>
</table>
<p>The 5-session package is recommended for those working with deep patterns, complex trauma, or who want to develop a lasting personal tapping practice. Five sessions creates the arc — opening, deepening, anchoring, and completing — that single sessions cannot fully reach alone.</p>
<p>The numbers are not incidental. 333 carries the frequency of alignment with the divine trinity — mind, body, spirit in coherence. 1,111 is the frequency of new beginnings, quantum portals, and the moment when thought and reality become one. These are the energetics of this work.</p>

<h2>How to Begin</h2>
<p><strong>1 — Reach Out.</strong> Share what you are working with — what you are feeling, what keeps returning, what you want to release or build. All inquiries are received personally and with care.</p>
<p><strong>2 — Book Your Session.</strong> Once we connect, we schedule your first session — in person or remotely. No prior experience with EFT is needed. You do not have to know how to tap. You only have to show up.</p>
<p><strong>3 — Arrive as You Are.</strong> Come as you are. Bring what is present. The session will meet you there.</p>
<p><strong>4 — Leave Different.</strong> Not as a promise. As the consistent, documented, peer-reviewed outcome of this work. Something will have shifted. The body does not lie about what it is no longer carrying.</p>

<hr/>

<p><em>Sessions held in person or remotely. No prior experience required. All sessions are confidential and held in sacred space. This work is complementary to — not a replacement for — clinical mental health care where indicated.</em></p>
`.trim(),
  },

  {
    slug: 'psychedelic-integration',
    title: 'Psychedelic Integration',
    description:
      'Sacred, skilled one-on-one support for processing and integrating psychedelic or plant medicine experiences. Curious newcomers welcome — no prior experience required.',
    category: 'Life Coaching',
    price: 33300,
    price_label: 'Investment shared in consultation',
    duration: 'Per session — in person or remote',
    sort_order: 1,
    body: `
<h2>Curious About Psychedelics &amp; Plant Medicine?</h2>
<p>I got you.</p>
<p>Whether you have never touched a medicine in your life and are simply feeling a pull you can't explain, or you are somewhere in the middle of a journey that has already begun — this is a safe place to ask your questions, voice your curiosity, and get real, grounded, honest information from someone who holds this work with deep care and integrity.</p>
<p>There is no wrong place to be on this path. Curiosity is its own form of readiness.</p>
<p>Reach out. We will talk. No pressure, no agenda — just an open conversation about where you are and what, if anything, might be right for you.</p>
<p><em>Inquiries are received personally and held in complete confidence.</em></p>

<h2>What Integration Is — and Why It Matters</h2>
<p>Something happened. Maybe it was planned, maybe it found you. Maybe it was profound and clear. Maybe it was overwhelming, disorienting, or left you with more questions than answers. Maybe it cracked something open that you don't yet have words for.</p>
<p>Whatever the experience — the medicine did its part. <strong>Now comes yours.</strong></p>
<p>Psychedelic experiences — whether through plant medicines like psilocybin, ayahuasca, peyote, or iboga, or through other consciousness-expanding compounds — have the documented capacity to dissolve long-held patterns, surface deep memory, rearrange perception, and open the self to levels of awareness that ordinary waking life rarely reaches. The research is clear. The experiences are real.</p>
<p>But the medicine does not integrate itself.</p>
<p>Without proper support, the insights fade. The openings close. The nervous system, left without a container to process what it received, can become dysregulated — anxious, ungrounded, overwhelmed. People return to the same patterns, not because the medicine failed, but because the bridge between the experience and daily life was never built.</p>
<p>Integration is that bridge. It is the most important part of the journey — and the most overlooked.</p>

<h2>What the Research Shows</h2>
<p>The renaissance of psychedelic science has produced some of the most significant mental health findings in decades. Johns Hopkins, NYU, MAPS, and Imperial College London have all documented that guided psychedelic experiences — followed by proper integration support — show remarkable results for:</p>
<ul>
  <li>Treatment-resistant depression and anxiety</li>
  <li>PTSD and complex trauma</li>
  <li>Addiction and compulsive patterns</li>
  <li>End-of-life distress and existential fear</li>
  <li>Spiritual emergence and identity reorganization</li>
  <li>Creativity, purpose, and radical self-understanding</li>
</ul>
<p>The operative phrase in every study is <em>followed by proper integration support</em>. The medicine opens the door. Integration is how you walk through it and build something lasting on the other side.</p>

<h2>What Integration Work Looks Like</h2>
<p>Integration is not therapy in the conventional sense. It is not about pathologizing what arose. It is not about reducing your experience to a diagnosis or a framework that makes it smaller than it was.</p>
<p>Integration is sacred, practical, and deeply personal. It is a collaborative process of making meaning — of taking what the medicine showed you and weaving it into the fabric of how you think, move, relate, create, and live.</p>
<p>In sessions together, we may explore:</p>
<p><strong>Understanding the experience</strong> — what arose, what it may be pointing to, what parts of you were being asked to be seen, released, or integrated.</p>
<p><strong>Somatic grounding</strong> — helping the body process and settle what the nervous system is still holding from the experience.</p>
<p><strong>Energetic and spiritual context</strong> — placing the experience within a larger sacred framework, one that honors both the intelligence of the plant and the intelligence of your own soul.</p>
<p><strong>Pattern recognition</strong> — identifying the old structures the experience was disrupting and consciously choosing what replaces them.</p>
<p><strong>Practical anchoring</strong> — translating insight into action, so that what opened becomes visible in your relationships, your work, your daily rhythms, and your sense of self.</p>
<p><strong>Ceremonial closure</strong> — honoring what occurred, completing the arc, and marking the threshold you have crossed.</p>

<h2>Who This Is For</h2>
<p>Integration support is available to anyone who has had a psychedelic or plant medicine experience — regardless of where it happened, how it was held, or how long ago it occurred. You may be a good fit for this work if:</p>
<ul>
  <li>You are simply curious and want real, honest answers before taking any step at all</li>
  <li>You recently had an experience and are seeking skilled, sacred support in processing it</li>
  <li>You had an experience months or years ago that never fully settled — insights that faded, emotions that didn't resolve, questions that stayed open</li>
  <li>You are preparing for an upcoming medicine experience and want support before, during, and after</li>
  <li>You had a difficult or challenging experience and need compassionate, skilled help making sense of what happened</li>
  <li>You are navigating spiritual emergence, identity shifts, or a profound reorganization of your worldview following an experience</li>
  <li>You simply know that what you went through mattered — and you want to honor it fully</li>
</ul>

<h2>A Note on Confidentiality &amp; Safety</h2>
<p>Everything shared in integration sessions is held in complete confidence. This is a space of absolute non-judgment — for what you experienced, how you experienced it, the choices you made to get there, and everything that arose.</p>
<p>Integration work does not require disclosure of where, how, or with whom your experience occurred. You bring what you bring. We work with what is here.</p>
<p>If at any point in our work together a clinical referral or additional support is indicated, that recommendation will be made with care and without pressure. Your wellbeing is the only agenda.</p>

<h2>How to Work Together</h2>
<p>Integration support is offered through individual sessions, held one-on-one in sacred space — in person or remotely. Session frequency and duration are tailored to where you are in your process. Some people need one or two sessions. Some benefit from an extended container over weeks or months.</p>
<p>Pricing and availability are shared during an initial consultation, where we can feel into what your process calls for and design a container that truly serves you.</p>

<h2>Reach Out</h2>
<p>Whether you are simply curious and just beginning to explore, somewhere in the middle of processing an experience, or ready to commit to a full integration container — the door is open.</p>
<p>Share a little about where you are and what brings you here. All inquiries are received personally, held in confidence, and responded to with genuine care.</p>
<p>You went somewhere profound. Let's make sure you bring it all the way back.</p>
<p>And if you're just curious — that is more than enough to start.</p>

<hr/>

<p><em>All sessions are held in complete confidentiality. This work is complementary to — not a replacement for — clinical mental health care where indicated.</em></p>
`.trim(),
  },

  {
    slug: 'quantum-healing',
    title: 'Quantum Healing',
    description:
      'A deep transformational ceremonial experience combining ancient healing plants and quantum technology, paired with body optimization and integration. A genuine reset of body, field, and foundation.',
    category: 'Energy Healing',
    price: 555500,
    price_label: '$5,555 — complete experience',
    duration: 'Ceremony + body optimization + 2 integration sessions',
    sort_order: 2,
    body: `
<h2>What This Is</h2>
<p>There are moments in life when information alone is not enough. When the body itself needs to be cleared. When the field needs to be emptied before it can be filled. When healing needs to happen at a level deeper than thought, deeper than strategy, deeper than will.</p>
<p><strong>Quantum Healing is that moment.</strong></p>
<p>This is a full ceremonial experience — a carefully held, deeply intentional gathering of ancient wisdom and modern quantum technology, designed to bring the body into peak state, dissolve what has accumulated, and restore the clarity that is your natural condition.</p>
<p>The specific details of what unfolds inside this ceremony are held in sacred confidence, in protection of the work and those who receive it. What can be said is this: <em>those who enter do not leave the same.</em> Greater awareness, more energy, a genuine reset — not as a concept, but as something felt in the body and carried forward in life.</p>

<h2>What You Receive</h2>
<h3>The Ceremony</h3>
<p>A full sacred ceremonial experience held with ancient healing plants and quantum technologies — a convergence designed to reset the system at its root. The details of what occurs inside are held in confidence, in reverence for the work and protection of those who receive it. You will be guided, held, and supported throughout.</p>

<h3>Blood Sovereignty Body Optimization</h3>
<p>In coordination with this ceremony, you will be brought into work with a trusted specialist in blood sovereignty — a dedicated practitioner whose focus is the deep detoxification and optimization of the physical body. This is not supplementary. The body is the vessel through which all clarity, energy, and awareness moves. When it is burdened, everything is muted. When it is clean, everything amplifies. This work ensures you arrive at and integrate from the ceremony in peak physical state.</p>

<h3>2 Integration Sessions</h3>
<p>Ceremony opens doors. Integration is how you walk through them and build a life on the other side. You receive two dedicated one-on-one sessions following the ceremony — held in sacred space, designed to help you make sense of what arose, anchor what shifted, and translate the experience into the way you move, lead, create, and live going forward. These sessions are where the ceremony becomes permanent.</p>

<h2>Who This Is For</h2>
<p>Quantum Healing is open to anyone who feels the call — regardless of background, belief system, or where they are on their path. You do not need to have done this kind of work before. You do not need to have it all figured out.</p>
<p>What is required is genuine readiness. A willingness to be honest. An openness to receive something you may not be able to fully name yet.</p>
<p>If something in you recognized itself reading this — that is enough.</p>

<h2>Investment</h2>
<p><strong>$5,555</strong> — one complete experience. Ceremony, body optimization, and 2 integration sessions.</p>
<p>This is a single, complete offering. Everything included above is woven together as one sacred container — the physical preparation, the ceremony itself, and the integration that follows. They are not separate. They are one arc of healing.</p>
<p><strong>Funding &amp; Credit Support Available.</strong> I work alongside a trusted partner who specializes in helping people access business funding and credit for investments in their growth and healing. If the investment is not accessible in this moment, this may be a path worth exploring. We can discuss it together during your consultation.</p>

<h2>How to Begin</h2>
<p><strong>1 — Submit Your Inquiry.</strong> Share a little about yourself, where you are in your life, and what is drawing you to this work. This is reviewed personally and with care.</p>
<p><strong>2 — Receive an Invitation to Consult.</strong> If there is resonance, you will be invited to a private consultation. This is a space to ask your questions, feel into the experience, and arrive at genuine clarity about whether this is your next step. There is no pressure. Only truth.</p>
<p><strong>3 — Prepare &amp; Be Held.</strong> Once you commit, you will be guided through everything you need to know to prepare — physically, energetically, and spiritually. You will not navigate this alone.</p>
<p><strong>4 — Enter the Ceremony.</strong> You arrive. The work begins. What happens inside is between you, the plants, the technology, and the field. What emerges belongs to you.</p>
<p><strong>5 — Integrate.</strong> Your two sessions begin. We meet what came up. We anchor what shifted. We build the bridge between the ceremony and your daily life — so that what opened does not close.</p>

<hr/>

<p><em>Space for this experience is ceremonially limited and held with great intention. Inquiries are reviewed personally. All who reach out are received with care, regardless of outcome.</em></p>
`.trim(),
  },

  {
    slug: 'medicine-sit',
    title: 'The Medicine Sit',
    description:
      'A 3-day private rites of passage container — two or more facilitators, sacred plant allies, quantum upleveling, and ancient ceremonial work. For those ready to go all the way in.',
    category: 'Energy Healing',
    price: 888800,
    price_label: 'From $8,888 · 3 days · +$3,333 per added participant',
    duration: '3 full days',
    sort_order: 3,
    body: `
<h2>What This Is</h2>
<p>Some thresholds cannot be crossed alone. Some layers of the self are too dense, too ancient, too deeply woven to be touched by conversation, by practice, by even the most powerful one-day ceremony. Some healing requires time. Sustained presence. A container that does not rush.</p>
<p><strong>The Medicine Sit is that container.</strong></p>
<p>Over three full days, you are held in an immersive ceremonial experience — supported by two or more trained facilitators, accompanied by sacred plant allies, and moved through quantum upleveling and ancient rites of passage that have the power to shift what nothing else has reached. This is not an event. It is a genuine threshold crossing. A before and after.</p>
<p>You arrive as one version of yourself. You leave as the one you have been becoming.</p>

<h2>What You Receive</h2>
<h3>A Personal 3-Day Ceremonial Container</h3>
<p>Three full days held exclusively for you — with two or more facilitators present throughout. This is not a group retreat where your experience is shared with strangers. This container is built entirely around you, your field, your process, and what the plants and the rites reveal. Every moment is held with intention. Nothing is rushed. Nothing is skipped.</p>

<h3>Two or More Facilitators</h3>
<p>You will never be alone inside this experience. Two or more trained practitioners are present with you for the duration — holding the space, guiding the rites, tracking your field, and ensuring that every layer of the experience is met with skill, care, and sacred presence. The depth of support here is rare. It is intentional.</p>

<h3>Sacred Plant Allies &amp; Quantum Upleveling</h3>
<p>The plant allies that accompany this sit are chosen in alignment with your specific process and what the work calls for. Alongside them, quantum technologies and sacred ceremonial rites of passage are woven throughout the three days — creating conditions for awareness, energy, and transformation that go beyond what ordinary experience makes possible. The details of what is used and how are held in sacred confidence, in protection of the work.</p>

<h3>Food Provided</h3>
<p>Nourishment is part of the container. Meals are thoughtfully prepared and provided throughout your three days — chosen to support the body's process, honor the work, and keep you grounded and well-resourced as you move through each layer of the experience.</p>

<h3>Accommodations</h3>
<p>Residential accommodation at the ceremonial location is available, allowing you to remain fully immersed in the container without the disruption of travel between sessions. For those who prefer or require it, remote location arrangements can also be made. Both options carry an additional investment — details provided during your consultation.</p>

<h2>Who This Is For</h2>
<p>The Medicine Sit is for the person who has done some work — and knows there is more. For the one who can feel what is still unresolved, still held in the body, still running the old pattern beneath the surface. For the leader, the healer, the visionary, the seeker who is ready — truly ready — to meet themselves without condition.</p>
<p>You do not need a particular background or belief system. You do need genuine readiness, honest intention, and a body and mind that are prepared for deep work. Preparation guidance will be provided once you commit.</p>
<p><em>This experience is held in a container of complete confidentiality and care.</em></p>

<h2>Pricing</h2>
<table>
  <tbody>
    <tr><td>1 person — personal sit with 2+ facilitators</td><td><strong>$8,888</strong></td></tr>
    <tr><td>Add a 2nd person</td><td><strong>+$3,333</strong></td></tr>
    <tr><td>Add a 3rd person</td><td><strong>+$3,333</strong></td></tr>
    <tr><td>Residential accommodation</td><td>Additional — discussed in consultation</td></tr>
    <tr><td>Remote location</td><td>Additional — discussed in consultation</td></tr>
    <tr><td>Food</td><td>Included</td></tr>
  </tbody>
</table>
<p>The base investment of $8,888 covers one person in a fully private, fully held 3-day container with two or more facilitators, all ceremonial elements, and food. Each additional participant brings their own unique energy and intention into the shared field — and is welcomed at $3,333 per person, up to three participants total.</p>
<p><strong>Flexible &amp; Sacred Agreements.</strong> If the investment is not fully accessible in this moment, I invite you to still reach out. A private consultation will allow us to explore what is possible — including payment arrangements that honor the integrity of the work and the reality of where you are.</p>
<p><strong>Funding &amp; Credit Support Available.</strong> I work alongside a trusted partner who specializes in helping people access business funding and credit for investments in their healing and growth. If this path could serve you, we can explore it together during your consultation.</p>

<h2>How to Begin</h2>
<p><strong>1 — Submit Your Inquiry.</strong> Share where you are, what has brought you to this, and what you are hoping to move through or into. Include whether you are coming alone or with others. This is read personally and held with care.</p>
<p><strong>2 — Receive an Invitation to Consult.</strong> If there is resonance, you will be invited into a private conversation — a space to ask everything you need to ask, feel into the experience, and arrive at genuine clarity. This is not a sales conversation. It is the beginning of the work.</p>
<p><strong>3 — Prepare.</strong> Once you commit, you will receive full preparation guidance — physically, energetically, nutritionally, and spiritually. You will know exactly how to arrive so that when the container opens, you are ready to receive everything it holds.</p>
<p><strong>4 — Enter the Container.</strong> Three days. Two or more facilitators. The plants. The rites. The field. What happens inside belongs to you — and to the sacred confidence of the work.</p>
<p><strong>5 — Cross the Threshold.</strong> You leave changed. Not as a promise. As the natural consequence of going all the way in.</p>

<hr/>

<p><em>The Medicine Sit is held in complete confidentiality. What enters the container stays in the container. Space is rare, sacred, and intentionally limited. Inquiries are reviewed personally. All who reach out are received with care, regardless of outcome.</em></p>
`.trim(),
  },

  {
    slug: 'quantum-alignment',
    title: 'Quantum Alignment',
    description:
      'A 6-month sacred initiatory container for entrepreneurs and leaders ready to bring vision, body, voice, and spirit into coherent resonance. Field amplification, prosperity activation, and ongoing support.',
    category: 'Life Coaching',
    price: 2500000,
    price_label: '$5,000 / mo · $25,000 paid in full · 6-month journey',
    duration: '6-month journey · 2–4 sessions per month',
    sort_order: 4,
    body: `
<h2>The Nature of This Work</h2>
<blockquote>"I don't believe I have something you don't. I believe I have been shown how to hold a space where what's already in you — your truth, your vision, your voice — can finally hear itself."</blockquote>
<p>There is a law in physics: place any oscillating system near a dominant, coherent rhythm, and eventually — always — it synchronizes. Not because it was forced. Because coherence is the path of least resistance, and the body knows it.</p>
<p>Through years of sacred practice, ceremony, and deep connection to lineage and the unified field, something has been cultivated here — not as personal achievement, but as a function of devotion. A quality of stillness that allows truth to become loud. A clarity that, by the laws of the cosmos, creates conditions for your own clarity to surface quickly.</p>
<p>People who sit in this space often describe arriving confused and leaving with language for things they have known for years but couldn't access. That is not the work of the practitioner. That is the work of coherence — and you are the one who holds the truth being revealed.</p>
<p>This offering is an invitation into that field. Into ceremony. Into the convergence of ancient wisdom and verified science. Into the version of your life and leadership that has been waiting for the right conditions to become visible.</p>

<h2>The Science Behind the Work</h2>
<p>These are not metaphors. Every law described below has been studied, published, and verified. What the ancients understood as sacred transmission, physics now calls <em>coherence propagation</em>.</p>

<h3>I — The Maharishi Effect &amp; TM-Sidhi Power</h3>
<p>The square root of 1% — at the Siddhi level — can restructure the coherence of collective reality.</p>
<p>In 1974, researchers found that when 1% of a population practiced Transcendental Meditation, crime in those cities dropped by an average of 16%. This became the Maharishi Effect. The more extraordinary discovery came with the TM-Sidhi program: coherence generated at the Siddhi level is proportional to the square of the number of practitioners — exponentially more potent than ordinary practice. In Washington D.C., in Lebanon, in Manila, coordinated Siddhi groups correlated with statistically measurable reductions in violence, conflict, and social disorder. The mechanism: individual brainwave coherence — verified by EEG — radiates into the shared field, and the field reorganizes toward order.</p>
<p><em>50+ peer-reviewed studies, Maharishi International University Research Division.</em></p>

<h3>II — Huygens Synchronization: The Clock Law</h3>
<p>Every oscillator near a dominant rhythm eventually entrains to it. Not metaphorically. Physically. Always.</p>
<p>In 1665, the Dutch physicist Christiaan Huygens noticed something extraordinary: two pendulum clocks mounted to the same wall would always — regardless of how they began — synchronize with each other. He called it "an odd sympathy." Modern experiments confirmed the mechanism: the dominant clock transmits imperceptible pulses through the shared medium, and those pulses gradually nudge every other rhythm into phase. The stronger oscillator sets the tempo. The others follow — not because they were told to, but because that is the physics of coupled systems. This applies to neurons, heartbeats, circadian rhythms, and the human nervous system. When you enter a field held by a dominant coherent presence, your own rhythms begin adjusting. Lucidity arrives not through effort, but because coherence is what the body naturally seeks.</p>
<p><em>Huygens (1665); confirmed Scientific Reports (2016); Royal Society Open Science (2017).</em></p>

<h3>III — Laser Coherence: Stimulated Emission</h3>
<p>One coherent photon encounters an excited atom and produces a perfect twin. Then a cascade. Then a beam that cuts through steel.</p>
<p>LASER stands for Light Amplification by Stimulated Emission of Radiation. A flashlight and the sun both produce enormous light — but neither can do what a laser does. The difference is not quantity. It is coherence. When photons are brought into phase — same direction, same frequency, same rhythm — a single one can stimulate another atom to release an identical twin. Those two become four. Four become eight. The amplification is not linear. It is exponential. Ordinary light becomes something that can perform surgery, cut metal, or travel to the moon and return a readable signal. This is the physics of what happens when your signal — your vision, your voice, your truth — enters a coherent field and finds its match.</p>
<p><em>Britannica, Stimulated Emission; ScienceDirect; Physics LibreTexts Ch. 12.3.</em></p>

<h3>IV — Constructive Interference: Wave Amplification</h3>
<p>When two waves align in phase, they do not add. They multiply. The amplitude exceeds either source alone.</p>
<p>Sound waves that are out of phase cancel each other — noise-canceling headphones work on exactly this principle. But when two waves align — peaks meeting peaks, troughs meeting troughs — the result is constructive interference. The combined amplitude is greater than either source. In acoustic engineering, this is how theaters are designed so that every seat hears full sound. What this means for this work: your signal — your truth, your voice, your vision — when brought into resonance with a coherent field, does not simply add to it. It amplifies. The combined field is greater than either alone. This is why people find language in these sessions that they could not find in years of thinking alone.</p>
<p><em>Britannica, Wave Interference; University of Waikato Science Learning Hub.</em></p>

<h3>V — Heart-Brain Coherence &amp; Biological Entrainment</h3>
<p>The heart is the body's master oscillator. In coherence, it pulls every other system — breath, brain, nervous system — into its rhythm.</p>
<p>HeartMath Institute research demonstrates that the heart generates the largest electromagnetic field in the human body — measurable several feet away. When cardiac coherence is established, the heart begins to entrain the brain, the breath, and the nervous system into its ordered pattern. Cognitive clarity, emotional regulation, and creative access are all measurably heightened in this state. Research confirmed that increased brainwave coherence in a Siddhi practitioner was followed, several seconds later, by increased brainwave coherence in nearby non-meditators — with no deliberate interaction. Serotonin levels in non-practitioners correlated significantly with the number of TM-Sidhi practitioners nearby. <strong>The body is listening to the field around it at all times.</strong></p>
<p><em>HeartMath Institute, Science of the Heart Ch. 4; MIU Maharishi Effect Review.</em></p>

<h3>VI — Quantum Field Theory &amp; Consciousness as Field</h3>
<p>Consciousness is not contained in the skull. It is a field. Fields interact, entangle, and influence — always.</p>
<p>Quantum entanglement — what Einstein called "spooky action at a distance" — describes particles that, once interacting, remain correlated regardless of separation. One changes; the other responds. Recent research in quantum biology has shown quantum effects in human olfaction, neural phase-locking, and heart-brain dynamics. HeartMath's quantum theory of consciousness proposes a universal quantum vibrational field with near-instantaneous brainwave synchrony across bodies and space. When one consciousness becomes highly ordered through practice, ceremony, lineage, and alignment, it creates a coherent basin. Other consciousnesses in proximity are drawn toward that order — not by force, but by the elegant mathematics of how fields interact. You do not have to <em>try</em> to become clear. You simply have to be near the right field long enough.</p>
<p><em>HeartMath Institute, Quantum Theory of Consciousness; Journal of Applied Mathematics and Physics (2023).</em></p>

<h2>What You Receive</h2>
<h3>I — Ceremonial Spiritual Protections</h3>
<p>Sacred initiatory protocols drawn from deep lineage — cleansing, sealing, and fortifying your energetic field. These establish clear boundaries so that your signal is clean, your channel is unobstructed, and what moves through you is yours alone. You enter the work protected, and you remain protected throughout.</p>

<h3>II — Deeper Alignment Transmissions</h3>
<p>Ceremonial sessions that bring your vision, body, voice, and spirit into coherent resonance. When these systems align, strategy becomes unnecessary — aligned action is obvious, momentum builds without force, and your work begins to move at the speed of truth rather than the speed of effort.</p>

<h3>III — Field Amplification: The Coherence Effect</h3>
<p>By entering sacred space together — with a practitioner deeply connected to lineage and the unified field — your own signal enters a zone of constructive interference. Your truth amplifies. Your vision becomes lucid. What has circled you in fog becomes clear, often within a single session. This is the Huygens law in lived experience: the dominant rhythm sets the tempo, and your clarity becomes the path of least resistance.</p>

<h3>IV — Prosperity &amp; Abundance Activation</h3>
<p>Ceremonially calibrated to open and sustain the channels through which prosperity flows — identifying and dissolving interference patterns like scarcity and contraction, and planting with intention the frequency of expansion, sovereignty, and natural abundance. The field remembers what we seed into it.</p>

<h3>V — Systems, Practices &amp; Voice Sovereignty</h3>
<p>Sacred space is held so your voice can come into full power — not the voice you have been performing, but the one beneath it. Alongside the ceremonial work, we build the practical containers: the daily practices, the structural rhythms, the systems that allow your clarity to sustain and compound between sessions. The work is to make your signal self-sustaining.</p>

<h3>VI — Ongoing Sacred Container &amp; Support</h3>
<p>You are held between sessions. Access to voice messages, real-time field support, and integration guidance as you move through the quantum shifts this work activates. The container does not close when the call ends. You are in the field for the full 6 months.</p>

<hr/>

<p><strong>2–4 sessions per month · 6-month full journey · Ongoing field support between sessions · 1 sacred initiation to open.</strong></p>

<h2>Investment</h2>
<table>
  <tbody>
    <tr><td>Monthly</td><td><strong>$5,000 / month</strong></td></tr>
    <tr><td>6-month journey, paid in full</td><td><strong>$25,000</strong> · Save $5,000</td></tr>
  </tbody>
</table>
<p><strong>Flexible Sacred Agreements.</strong> I understand that the most aligned people don't always arrive with perfect financial conditions. That is often part of the very pattern we are here to dissolve. If the full investment is not accessible in this moment, I invite you to inquire. A private consultation will allow us to explore what a manageable, sacred agreement looks like — one that honors both the integrity of the work and where you are right now. The commitment itself is an activation. We begin from truth.</p>
<p><strong>Funding &amp; Credit Support Available.</strong> I also work alongside a trusted partner who specializes in helping visionary entrepreneurs access business funding and credit — so that investment in your growth is not limited by what you currently have in hand. If this is a path that could serve you, we can explore it together as part of our consultation. You deserve access to the resources that match the scale of what you are building.</p>

<h2>How to Begin</h2>
<p><strong>1 — Submit Your Inquiry.</strong> Share where you are, what you are building, and what you feel called toward. Include where you are feeling stuck, scattered, or unclear. This opens the field between us and is reviewed personally.</p>
<p><strong>2 — Receive an Invitation to Consult.</strong> If there is resonance, you will be invited to a private consultation — a space to feel into the work, ask your questions, and arrive at clarity about whether this is your next step. This call is not a sales call. It is itself a transmission.</p>
<p><strong>3 — Arrive at a Sacred Agreement.</strong> We reach a structure that honors your readiness and your resources — whether the full investment, a payment arrangement, or support through funding and credit access. Whatever we agree to is a covenant. Sacred and binding in the best possible way.</p>
<p><strong>4 — Enter the Field.</strong> Your initiation begins. The 6-month journey opens — and with it, the exponential amplification of everything you have been carrying alone. You are no longer in a scattered field. You are in a laser.</p>

<hr/>

<p><em>Inquiries are reviewed personally. Space in this offering is intentionally and ceremonially limited. All who inquire are held with care, regardless of outcome.</em></p>
`.trim(),
  },

  {
    slug: 'hermetica-superfoods',
    title: 'Hermetica Superfoods',
    description:
      'Elite-grade nutrition for those who demand more. A brand I trust, a discount for my community, and an opportunity for those called to share it.',
    category: 'Nutrition',
    price: 0,
    price_label: 'Use code 888 at checkout · Affiliate opportunities available',
    duration: 'Ongoing nourishment',
    sort_order: 5,
    body: `
<h2>Why I Recommend Hermetica</h2>
<p>The work I do — ceremony, integration, alignment, healing — requires a body that is resourced. A nervous system that is clean. A physical vessel that can hold what the work opens.</p>
<p><strong>Nutrition is not separate from spiritual practice. It is the foundation of it.</strong></p>
<p>Hermetica Superfoods is the brand I recommend to my community because it reflects the same values I hold in my own work — uncompromising integrity, precision, and a genuine commitment to what actually works. No shortcuts. No synthetic additives. No noise. Just the most potent, pure, and bioavailable superfoods on Earth, formulated to sharpen your energy, support your clarity, and build the physical resilience that deep inner work demands.</p>
<p>Every product is 100% organic, third-party lab tested, heavy metal free, and GMP certified. Their formulations are built on synergistic stacking — combining compounds in precise ratios to amplify absorption and effectiveness up to 5x compared to standard supplements.</p>
<p><em>This is nutrition designed for people who are serious about their potential.</em></p>

<h2>The Products</h2>

<h3>Eternity — Mushroom Complex Gummies</h3>
<p>Lion's Mane, Reishi, Cordyceps, and Chaga — four of the most researched functional mushrooms on Earth, combined into a daily gummy that supports cognitive clarity, immune resilience, sustained energy, and longevity. For those doing deep inner work, this is foundational. <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">Shop Eternity →</a></p>

<h3>Deva — Shilajit Gummy</h3>
<p>Himalayan Shilajit with Ashwagandha and Cordyceps — a mineral-rich, ancient adaptogenic compound revered for thousands of years for its ability to restore vitality, support hormonal balance, enhance physical performance, and deepen the body's capacity to handle stress and demand. In gummy form, with maximum bioavailability. <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">Shop Deva →</a></p>

<h3>Meru — Infused Shilajit Tablets</h3>
<p>Pure Himalayan Shilajit with a peppermint infusion — for those who prefer a tablet form. Carries the full mineral and fulvic acid profile of authentic Shilajit, delivering over 85 trace minerals and bioactive compounds directly to the cells. <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">Shop Meru →</a></p>

<h3>Blue Crush — Marine Collagen Gummies</h3>
<p>Wild-caught marine collagen for skin integrity, joint health, connective tissue repair, and deep cellular regeneration. The body that does ceremony, that moves through transformation, that holds space for others — needs to be maintained from the inside out. <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">Shop Blue Crush →</a></p>

<h3>Hush — Herbal Sleep &amp; Relaxation Gummies</h3>
<p>A botanical blend of Reishi, Chamomile, L-Theanine, GABA, and a micro-dose of melatonin — formulated to support deep, restful sleep without grogginess. Integration happens in sleep. Healing happens in sleep. This product is sacred in its own right. <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">Shop Hush →</a></p>

<h3>Cozy — Adaptogenic Chai Latte Superfood</h3>
<p>Ashwagandha and Lion's Mane in a warming, ceremonial chai blend — a daily ritual drink that supports calm focus, adrenal health, and sustained mental clarity. A beautiful way to begin a morning with intention. <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">Shop Cozy →</a></p>

<h2>Your Discount</h2>
<p>Use code <strong>888</strong> at checkout for a discount on your order.</p>
<p>Shop the full collection here: <a href="https://hermeticasuperfoods.com/kilo" target="_blank" rel="noopener noreferrer">hermeticasuperfoods.com/kilo</a></p>
<p>The number 888 is not random. In numerology it carries the frequency of abundance, infinite flow, and alignment between the physical and the cosmic. It is the number of <em>as above, so below</em> — the foundational law of Hermetica itself. Use it with intention.</p>

<h2>Become an Affiliate</h2>
<p>If Hermetica resonates with you — if you believe in this level of quality and want to share it with your own community — there is an opportunity to become an affiliate and earn through your recommendations.</p>
<p>This is not something I extend to everyone. Representing a brand I trust is a reflection of my own integrity, and I hold the same standard for those who carry it forward through my community.</p>
<p>To be considered, reach out and introduce yourself. Tell me about your community, your values, and why you feel called to share this work. If there is alignment in ethics, intention, and standard — we will have a conversation about next steps.</p>
<p><em>Affiliate inquiries are reviewed personally. Not everyone will be the right fit, and that is not a judgment — it is a commitment to the integrity of what we are building together.</em></p>
<p>Reach out to inquire about the affiliate opportunity.</p>

<hr/>

<p><em>Free express shipping on orders over $100. All products are organic, non-GMO, vegan where applicable, third-party tested, and heavy metal free.</em></p>
`.trim(),
  },
];

async function seedOfferings() {
  const client = getClient();

  let createdCount = 0;
  let updatedCount = 0;

  for (const o of offerings) {
    const existing = await client.execute({
      sql: `SELECT id FROM services WHERE slug = ?`,
      args: [o.slug],
    });

    if (existing.rows.length > 0) {
      await client.execute({
        sql: `UPDATE services SET title = ?, description = ?, body = ?, category = ?, price = ?, price_label = ?, duration = ?, sort_order = ?, is_active = 1, updated_at = ? WHERE slug = ?`,
        args: [
          o.title,
          o.description,
          o.body,
          o.category,
          o.price,
          o.price_label,
          o.duration,
          o.sort_order,
          now,
          o.slug,
        ],
      });
      console.log(`Updated: ${o.title} (${o.slug})`);
      updatedCount++;
    } else {
      await client.execute({
        sql: `INSERT INTO services (id, title, slug, description, body, image_url, price, price_label, duration, category, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
        args: [
          ulid(),
          o.title,
          o.slug,
          o.description,
          o.body,
          '',
          o.price,
          o.price_label,
          o.duration,
          o.category,
          o.sort_order,
          now,
          now,
        ],
      });
      console.log(`Created: ${o.title} (${o.slug})`);
      createdCount++;
    }
  }

  console.log(`\nDone — ${createdCount} created, ${updatedCount} updated.`);
  process.exit(0);
}

seedOfferings().catch((err) => {
  console.error('Offerings seed failed:', err);
  process.exit(1);
});
