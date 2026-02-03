/**
 * FeelingTheWord - Scripture for Your Heart
 * 
 * A devotional web app that provides Bible verse recommendations
 * based on emotions, feelings, and life situations.
 * 
 * No verse lookup by reference - only emotion/topic-based matching.
 */

// ============================================
// DOM Elements
// ============================================

const feelingInput = document.getElementById('feelingInput');
const receiveButton = document.getElementById('receiveButton');
const buttonLoader = document.getElementById('buttonLoader');
const resultSection = document.getElementById('resultSection');
const verseText = document.getElementById('verseText');
const verseReference = document.getElementById('verseReference');
const copyButton = document.getElementById('copyButton');
const newButton = document.getElementById('newButton');

// ============================================
// Bible Verses Database
// Organized by emotional/spiritual categories
// ============================================

const verseDatabase = {
    anxiety: [
        {
            text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
            reference: "Philippians 4:6-7"
        },
        {
            text: "Cast all your anxiety on him because he cares for you.",
            reference: "1 Peter 5:7"
        },
        {
            text: "When anxiety was great within me, your consolation brought me joy.",
            reference: "Psalm 94:19"
        },
        {
            text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
            reference: "John 14:27"
        },
        {
            text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
            reference: "Matthew 6:34"
        }
    ],
    
    fear: [
        {
            text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
            reference: "2 Timothy 1:7"
        },
        {
            text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
            reference: "Psalm 23:4"
        },
        {
            text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
            reference: "Isaiah 41:10"
        },
        {
            text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
            reference: "Psalm 27:1"
        },
        {
            text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
            reference: "Joshua 1:9"
        }
    ],
    
    sadness: [
        {
            text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
            reference: "Psalm 34:18"
        },
        {
            text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
            reference: "Revelation 21:4"
        },
        {
            text: "Blessed are those who mourn, for they will be comforted.",
            reference: "Matthew 5:4"
        },
        {
            text: "Weeping may stay for the night, but rejoicing comes in the morning.",
            reference: "Psalm 30:5"
        },
        {
            text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles.",
            reference: "2 Corinthians 1:3-4"
        }
    ],
    
    hope: [
        {
            text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
            reference: "Jeremiah 29:11"
        },
        {
            text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
            reference: "Romans 15:13"
        },
        {
            text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
            reference: "Isaiah 40:31"
        },
        {
            text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
            reference: "Hebrews 11:1"
        },
        {
            text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
            reference: "Romans 8:28"
        }
    ],
    
    strength: [
        {
            text: "I can do all this through him who gives me strength.",
            reference: "Philippians 4:13"
        },
        {
            text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
            reference: "Psalm 28:7"
        },
        {
            text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
            reference: "2 Corinthians 12:9"
        },
        {
            text: "God is our refuge and strength, an ever-present help in trouble.",
            reference: "Psalm 46:1"
        },
        {
            text: "Finally, be strong in the Lord and in his mighty power.",
            reference: "Ephesians 6:10"
        }
    ],
    
    peace: [
        {
            text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
            reference: "Philippians 4:7"
        },
        {
            text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
            reference: "Isaiah 26:3"
        },
        {
            text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
            reference: "Matthew 11:28-29"
        },
        {
            text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
            reference: "Colossians 3:15"
        },
        {
            text: "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
            reference: "Psalm 4:8"
        }
    ],
    
    gratitude: [
        {
            text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
            reference: "1 Thessalonians 5:18"
        },
        {
            text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
            reference: "Psalm 100:4"
        },
        {
            text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
            reference: "James 1:17"
        },
        {
            text: "I will give thanks to you, Lord, with all my heart; I will tell of all your wonderful deeds.",
            reference: "Psalm 9:1"
        },
        {
            text: "Thanks be to God for his indescribable gift!",
            reference: "2 Corinthians 9:15"
        }
    ],
    
    guidance: [
        {
            text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
            reference: "Proverbs 3:5-6"
        },
        {
            text: "Your word is a lamp for my feet, a light on my path.",
            reference: "Psalm 119:105"
        },
        {
            text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
            reference: "James 1:5"
        },
        {
            text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'",
            reference: "Isaiah 30:21"
        },
        {
            text: "The Lord makes firm the steps of the one who delights in him; though he may stumble, he will not fall, for the Lord upholds him with his hand.",
            reference: "Psalm 37:23-24"
        }
    ],
    
    love: [
        {
            text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
            reference: "1 Corinthians 13:13"
        },
        {
            text: "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
            reference: "1 John 3:1"
        },
        {
            text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
            reference: "Zephaniah 3:17"
        },
        {
            text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
            reference: "Romans 5:8"
        },
        {
            text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
            reference: "Romans 8:38-39"
        }
    ],
    
    loneliness: [
        {
            text: "Never will I leave you; never will I forsake you.",
            reference: "Hebrews 13:5"
        },
        {
            text: "The Lord is near to all who call on him, to all who call on him in truth.",
            reference: "Psalm 145:18"
        },
        {
            text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
            reference: "Deuteronomy 31:6"
        },
        {
            text: "Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there; if I make my bed in the depths, you are there.",
            reference: "Psalm 139:7-8"
        },
        {
            text: "A father to the fatherless, a defender of widows, is God in his holy dwelling. God sets the lonely in families.",
            reference: "Psalm 68:5-6"
        }
    ],
    
    forgiveness: [
        {
            text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
            reference: "1 John 1:9"
        },
        {
            text: "As far as the east is from the west, so far has he removed our transgressions from us.",
            reference: "Psalm 103:12"
        },
        {
            text: "Come now, let us settle the matter. Though your sins are like scarlet, they shall be as white as snow; though they are red as crimson, they shall be like wool.",
            reference: "Isaiah 1:18"
        },
        {
            text: "In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God's grace.",
            reference: "Ephesians 1:7"
        },
        {
            text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
            reference: "Romans 8:1"
        }
    ],
    
    faith: [
        {
            text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
            reference: "Hebrews 11:1"
        },
        {
            text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you.",
            reference: "Matthew 17:20"
        },
        {
            text: "Without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.",
            reference: "Hebrews 11:6"
        },
        {
            text: "For we live by faith, not by sight.",
            reference: "2 Corinthians 5:7"
        },
        {
            text: "Trust in the Lord forever, for the Lord, the Lord himself, is the Rock eternal.",
            reference: "Isaiah 26:4"
        }
    ]
};

// ============================================
// Keyword Mapping
// Maps user input keywords to categories
// ============================================

const keywordMap = {
    anxiety: ['anxious', 'anxiety', 'worried', 'worry', 'stress', 'stressed', 'overwhelmed', 'overwhelm', 'nervous', 'panic', 'uneasy', 'restless', 'tense', 'uptight', 'apprehensive', 'troubled', 'concerned', 'fret', 'fretting'],
    
    fear: ['fear', 'afraid', 'scared', 'terrified', 'frightened', 'fearful', 'dread', 'phobia', 'scary', 'horror', 'panic', 'terror', 'intimidated', 'threatened', 'worried', 'doubt', 'insecure'],
    
    sadness: ['sad', 'sadness', 'depressed', 'depression', 'grief', 'grieving', 'mourn', 'mourning', 'sorrow', 'sorrowful', 'heartbroken', 'broken', 'hurt', 'hurting', 'pain', 'painful', 'crying', 'cry', 'tears', 'weeping', 'despair', 'hopeless', 'melancholy', 'blue', 'down', 'unhappy', 'discouraged', 'disappointed'],
    
    hope: ['hope', 'hopeful', 'hopeless', 'future', 'tomorrow', 'expectation', 'optimism', 'optimistic', 'anticipate', 'looking forward', 'better days', 'brighter', 'renewal', 'restore', 'restoration', 'new beginning', 'fresh start'],
    
    strength: ['strength', 'strong', 'weak', 'weakness', 'tired', 'exhausted', 'weary', 'fatigued', 'drained', 'burden', 'burdened', 'heavy', 'struggle', 'struggling', 'difficult', 'hard', 'tough', 'challenging', 'persevere', 'endure', 'courage', 'brave', 'power', 'mighty', 'energy', 'vigor'],
    
    peace: ['peace', 'peaceful', 'calm', 'calming', 'quiet', 'still', 'rest', 'restful', 'serenity', 'serene', 'tranquil', 'relax', 'relaxing', 'quietness', 'silence', 'solitude', 'content', 'contentment', 'harmony', 'balance', 'centered', 'mindful'],
    
    gratitude: ['grateful', 'gratitude', 'thankful', 'thanks', 'blessed', 'blessing', 'appreciate', 'appreciation', 'gratefulness', 'recognition', 'acknowledge', 'praise', 'worship', 'adore', 'glory', 'honor', 'celebrate', 'rejoice', 'joyful', 'happy', 'happiness'],
    
    guidance: ['guidance', 'guide', 'direction', 'path', 'way', 'lost', 'confused', 'confusion', 'uncertain', 'uncertainty', 'decision', 'decisions', 'choice', 'choices', 'wisdom', 'wise', 'understand', 'understanding', 'clarity', 'clear', 'purpose', 'calling', 'plan', 'plans', 'next step', 'what to do', 'help me', 'show me'],
    
    love: ['love', 'loved', 'beloved', 'cherish', 'adore', 'affection', 'compassion', 'kindness', 'gentle', 'gentleness', 'tender', 'tenderness', 'care', 'caring', 'acceptance', 'accepted', 'worthy', 'value', 'valued', 'precious', 'treasured', 'special'],
    
    loneliness: ['lonely', 'loneliness', 'alone', 'isolated', 'isolation', 'abandoned', 'forsaken', 'rejected', 'rejection', 'empty', 'emptiness', 'disconnected', 'unwanted', 'unloved', 'solitary', 'companion', 'companionship', 'friend', 'friendship', 'belong', 'belonging'],
    
    forgiveness: ['forgive', 'forgiveness', 'forgiven', 'guilt', 'guilty', 'shame', 'ashamed', 'regret', 'remorse', 'sorry', 'apologize', 'apology', 'sin', 'sins', 'sinner', 'wrong', 'mistake', 'mistakes', 'fault', 'fail', 'failure', 'failed', 'condemned', 'condemnation', 'clean', 'washed', 'pure', 'purity'],
    
    faith: ['faith', 'believe', 'belief', 'trust', 'doubt', 'doubting', 'question', 'questions', 'questioning', 'uncertain', 'unsure', 'skeptical', 'skepticism', 'conviction', 'confidence', 'assurance', 'commitment', 'devotion', 'loyalty']
};

// Fallback verses when no category is detected
const fallbackVerses = [
    {
        text: "The Lord is compassionate and gracious, slow to anger, abounding in love. He will not always accuse, nor will he harbor his anger forever; he does not treat us as our sins deserve or repay us according to our iniquities.",
        reference: "Psalm 103:8-10"
    },
    {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference: "John 3:16"
    },
    {
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
        reference: "Psalm 23:1-3"
    },
    {
        text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        reference: "Matthew 6:33"
    },
    {
        text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
        reference: "Psalm 46:10"
    }
];

// ============================================
// State
// ============================================

let currentCategory = null;
let lastVerseIndex = -1;

// ============================================
// Event Listeners
// ============================================

receiveButton.addEventListener('click', handleReceiveVerse);
newButton.addEventListener('click', handleAnotherVerse);
copyButton.addEventListener('click', copyToClipboard);

// Allow Enter key to submit (Shift+Enter for new line)
feelingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleReceiveVerse();
    }
});

// ============================================
// Main Functions
// ============================================

/**
 * Handles the "Receive a Verse" button click
 */
async function handleReceiveVerse() {
    const input = feelingInput.value.trim();
    
    if (!input) {
        feelingInput.focus();
        return;
    }
    
    // Show loading state
    setLoading(true);
    hideResult();
    
    // Simulate brief processing for UX
    await delay(600);
    
    // Detect category from input
    const category = detectCategory(input);
    currentCategory = category;
    
    // Get a verse
    const verse = getRandomVerse(category);
    
    // Display the verse
    displayVerse(verse);
    
    // Remove loading state
    setLoading(false);
}

/**
 * Handles the "Another Verse" button click
 * Gets a different verse from the same category
 */
function handleAnotherVerse() {
    if (!currentCategory) return;
    
    const verse = getRandomVerse(currentCategory);
    displayVerse(verse);
}

/**
 * Detects the emotional/spiritual category from user input
 * @param {string} input - User's feeling description
 * @returns {string|null} - Detected category or null for fallback
 */
function detectCategory(input) {
    const lowerInput = input.toLowerCase();
    const scores = {};
    
    // Score each category based on keyword matches
    for (const [category, keywords] of Object.entries(keywordMap)) {
        scores[category] = 0;
        
        for (const keyword of keywords) {
            // Check for exact word match
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            if (regex.test(lowerInput)) {
                scores[category] += 1;
            }
            // Also check for partial matches (for compound words)
            else if (lowerInput.includes(keyword)) {
                scores[category] += 0.5;
            }
        }
    }
    
    // Find the category with highest score
    let bestCategory = null;
    let highestScore = 0;
    
    for (const [category, score] of Object.entries(scores)) {
        if (score > highestScore) {
            highestScore = score;
            bestCategory = category;
        }
    }
    
    // Return category only if score meets threshold
    return highestScore >= 0.5 ? bestCategory : null;
}

/**
 * Gets a random verse from the specified category
 * @param {string|null} category - The category to get a verse from
 * @returns {Object} - A verse object with text and reference
 */
function getRandomVerse(category) {
    let verses;
    
    if (category && verseDatabase[category]) {
        verses = verseDatabase[category];
    } else {
        verses = fallbackVerses;
    }
    
    // Get random index, avoiding the last shown verse if possible
    let index;
    if (verses.length > 1) {
        do {
            index = Math.floor(Math.random() * verses.length);
        } while (index === lastVerseIndex);
    } else {
        index = 0;
    }
    
    lastVerseIndex = index;
    return verses[index];
}

/**
 * Displays the verse in the result section
 * @param {Object} verse - The verse to display
 */
function displayVerse(verse) {
    verseText.textContent = verse.text;
    verseReference.textContent = verse.reference;
    resultSection.classList.add('visible');
    
    // Reset copy button
    copyButton.classList.remove('copied');
    copyButton.querySelector('span').textContent = 'Copy';
    
    // Scroll to result on mobile
    if (window.innerWidth <= 480) {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Hides the result section
 */
function hideResult() {
    resultSection.classList.remove('visible');
}

/**
 * Sets the loading state of the receive button
 * @param {boolean} isLoading - Whether to show loading state
 */
function setLoading(isLoading) {
    receiveButton.disabled = isLoading;
    receiveButton.classList.toggle('loading', isLoading);
}

/**
 * Utility: Creates a delay promise
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Resolves after the delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// Copy to Clipboard
// ============================================

/**
 * Copies the current verse to clipboard
 */
async function copyToClipboard() {
    const text = verseText.textContent;
    const reference = verseReference.textContent;
    const fullText = `${text} — ${reference}`;
    
    try {
        await navigator.clipboard.writeText(fullText);
        showCopiedState();
    } catch (err) {
        fallbackCopy(fullText);
    }
}

/**
 * Shows the copied success state on the button
 */
function showCopiedState() {
    copyButton.classList.add('copied');
    copyButton.querySelector('span').textContent = 'Copied!';
    
    setTimeout(() => {
        copyButton.classList.remove('copied');
        copyButton.querySelector('span').textContent = 'Copy';
    }, 2000);
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 */
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopiedState();
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textarea);
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    feelingInput.focus();
});
