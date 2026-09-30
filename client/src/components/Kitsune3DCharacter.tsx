import React from "react";

interface Kitsune3DCharacterProps {
  className?: string;
  happyEyes?: boolean;
}

export function Kitsune3DCharacter({ className = "", happyEyes = false }: Kitsune3DCharacterProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 840 840"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-label="3D Purple Kitsune Memoji Character"
    >
      <defs>
        {/* Soft 3D velvet ambient shadows */}
        <filter id="dropShadow3D" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#06020e" floodOpacity="0.7" />
        </filter>
        <filter id="tailShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-4" dy="8" stdDeviation="12" floodColor="#070212" floodOpacity="0.55" />
        </filter>
        <filter id="rubyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff1f44" floodOpacity="0.45" />
        </filter>

        {/* 3D Purple Velvet Gradients */}
        <radialGradient id="craniumVelvet" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ad5bf8" />
          <stop offset="30%" stopColor="#882cd9" />
          <stop offset="65%" stopColor="#6013a8" />
          <stop offset="90%" stopColor="#3d0774" />
          <stop offset="100%" stopColor="#230344" />
        </radialGradient>

        {/* Left Ear Outer (facing light from top-left) */}
        <linearGradient id="earLOuter" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#c78dfc" />
          <stop offset="25%" stopColor="#983de8" />
          <stop offset="65%" stopColor="#6515b4" />
          <stop offset="100%" stopColor="#330560" />
        </linearGradient>

        {/* Right Ear Outer (standing very tall and upright ~80°) */}
        <linearGradient id="earROuter" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#b976fc" />
          <stop offset="30%" stopColor="#882cd9" />
          <stop offset="75%" stopColor="#560fa2" />
          <stop offset="100%" stopColor="#290352" />
        </linearGradient>

        {/* Ear Cavity: Deep Matte Obsidian Hollows */}
        <radialGradient id="earHollowL" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2d2737" />
          <stop offset="45%" stopColor="#191522" />
          <stop offset="85%" stopColor="#0b0811" />
          <stop offset="100%" stopColor="#040307" />
        </radialGradient>

        <radialGradient id="earHollowR" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#282230" />
          <stop offset="45%" stopColor="#16121d" />
          <stop offset="85%" stopColor="#09070e" />
          <stop offset="100%" stopColor="#030206" />
        </radialGradient>

        {/* Black Winged Mask: Flows down from ears across eyes */}
        <linearGradient id="maskGradL" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#2d2537" />
          <stop offset="35%" stopColor="#1b1623" />
          <stop offset="75%" stopColor="#100d17" />
          <stop offset="100%" stopColor="#07050a" />
        </linearGradient>

        <linearGradient id="maskGradR" x1="80%" y1="10%" x2="20%" y2="90%">
          <stop offset="0%" stopColor="#292232" />
          <stop offset="35%" stopColor="#191421" />
          <stop offset="75%" stopColor="#0e0b14" />
          <stop offset="100%" stopColor="#060408" />
        </linearGradient>

        {/* White Plush Fur Gradients */}
        <radialGradient id="whiteCheeks" cx="48%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f8f2fd" />
          <stop offset="85%" stopColor="#e2d3f0" />
          <stop offset="100%" stopColor="#c5b0db" />
        </radialGradient>

        <linearGradient id="whiteChest" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f4ecfa" />
          <stop offset="100%" stopColor="#dac7ec" />
        </linearGradient>

        {/* Ruby Gemstone Eyes */}
        <radialGradient id="rubyEyeL" cx="42%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#ff6b8b" />
          <stop offset="25%" stopColor="#ee0d32" />
          <stop offset="65%" stopColor="#98031a" />
          <stop offset="90%" stopColor="#4c000a" />
          <stop offset="100%" stopColor="#200004" />
        </radialGradient>

        <radialGradient id="rubyEyeR" cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#ff6b8b" />
          <stop offset="25%" stopColor="#ee0d32" />
          <stop offset="65%" stopColor="#98031a" />
          <stop offset="90%" stopColor="#4c000a" />
          <stop offset="100%" stopColor="#200004" />
        </radialGradient>

        {/* 9 Tails Gradients */}
        <linearGradient id="tailVelvet" x1="20%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#240446" />
          <stop offset="35%" stopColor="#51118e" />
          <stop offset="70%" stopColor="#7f28c8" />
          <stop offset="100%" stopColor="#a74ef9" />
        </linearGradient>

        <linearGradient id="tailWhiteTip" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#cfbee3" />
          <stop offset="30%" stopColor="#f3ecfb" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Ground Ambient Contact Shadow */}
        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(4, 1, 9, 0.88)" />
          <stop offset="45%" stopColor="rgba(21, 6, 42, 0.42)" />
          <stop offset="80%" stopColor="rgba(21, 6, 42, 0.12)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>
      </defs>

      {/* 1. Ground Contact Shadow */}
      <ellipse cx="415" cy="715" rx="260" ry="42" fill="url(#groundShadow)" />

      {/* 2. THE 9 3D TAILS IN ACCURATE DEPTH & FANNING (MATCHING IMAGE 2) */}
      <g id="nine-tails-layer">
        {/* Tail 1: Far Bottom-Left (sweeps forward and curls) */}
        <g transform="translate(400, 560) rotate(-96)" filter="url(#tailShadow)">
          <path d="M-36,0 C-115,-110 -138,-260 0,-330 C138,-260 115,-110 36,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-330 C-62,-290 -68,-240 -48,-210 L-22,-250 L0,-222 L22,-250 C68,-240 62,-290 0,-330 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 2: Mid-Bottom Left */}
        <g transform="translate(400, 560) rotate(-72)" filter="url(#tailShadow)">
          <path d="M-40,0 C-125,-125 -148,-285 0,-365 C148,-285 125,-125 40,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-365 C-70,-320 -76,-260 -54,-230 L-25,-272 L0,-242 L25,-272 C76,-260 70,-320 0,-365 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 3: Mid-Upper Left (behind left ear) */}
        <g transform="translate(400, 560) rotate(-46)" filter="url(#tailShadow)">
          <path d="M-44,0 C-132,-138 -155,-305 0,-395 C155,-305 132,-138 44,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-395 C-75,-345 -82,-280 -58,-250 L-27,-295 L0,-265 L27,-295 C82,-280 75,-345 0,-395 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 4: Upper Left Crown (behind head) */}
        <g transform="translate(400, 560) rotate(-22)" filter="url(#tailShadow)">
          <path d="M-46,0 C-136,-145 -160,-320 0,-415 C160,-320 136,-145 46,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-415 C-78,-365 -86,-295 -60,-262 L-28,-310 L0,-278 L28,-310 C86,-295 78,-365 0,-415 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 5: Top Right Crown (rising behind right ear) */}
        <g transform="translate(400, 560) rotate(5)" filter="url(#tailShadow)">
          <path d="M-48,0 C-140,-150 -165,-330 0,-428 C165,-330 140,-150 48,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-428 C-80,-378 -88,-305 -62,-272 L-29,-320 L0,-288 L29,-320 C88,-305 80,-378 0,-428 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 6: Upper Right (fanning right) */}
        <g transform="translate(400, 560) rotate(32)" filter="url(#tailShadow)">
          <path d="M-46,0 C-136,-145 -160,-320 0,-415 C160,-320 136,-145 46,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-415 C-78,-365 -86,-295 -60,-262 L-28,-310 L0,-278 L28,-310 C86,-295 78,-365 0,-415 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 7: Mid-Upper Right */}
        <g transform="translate(400, 560) rotate(56)" filter="url(#tailShadow)">
          <path d="M-44,0 C-132,-138 -155,-305 0,-395 C155,-305 132,-138 44,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-395 C-75,-345 -82,-280 -58,-250 L-27,-295 L0,-265 L27,-295 C82,-280 75,-345 0,-395 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 8: Mid-Bottom Right */}
        <g transform="translate(400, 560) rotate(80)" filter="url(#tailShadow)">
          <path d="M-40,0 C-125,-125 -148,-285 0,-365 C148,-285 125,-125 40,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-365 C-70,-320 -76,-260 -54,-230 L-25,-272 L0,-242 L25,-272 C76,-260 70,-320 0,-365 Z" fill="url(#tailWhiteTip)" />
        </g>

        {/* Tail 9: Far Bottom-Right */}
        <g transform="translate(400, 560) rotate(104)" filter="url(#tailShadow)">
          <path d="M-36,0 C-115,-110 -138,-260 0,-330 C138,-260 115,-110 36,0 Z" fill="url(#tailVelvet)" />
          <path d="M0,-330 C-62,-290 -68,-240 -48,-210 L-22,-250 L0,-222 L22,-250 C68,-240 62,-290 0,-330 Z" fill="url(#tailWhiteTip)" />
        </g>
      </g>

      {/* 3. SEATED BODY HAUNCHES, BELLY & CHEST FUR */}
      <g id="body-group">
        {/* Left Hind Haunch */}
        <ellipse cx="300" cy="625" rx="75" ry="62" fill="url(#craniumVelvet)" transform="rotate(-18 300 625)" />
        {/* Right Hind Haunch */}
        <ellipse cx="520" cy="625" rx="75" ry="62" fill="url(#craniumVelvet)" transform="rotate(18 520 625)" />

        {/* Center Purple Belly Core */}
        <ellipse cx="410" cy="590" rx="98" ry="92" fill="url(#craniumVelvet)" />

        {/* Fluffy Snow-White Chest Fur Bib */}
        <path
          d="M350,505 C330,575 340,645 410,675 C480,645 490,575 470,505 C440,522 380,522 350,505 Z"
          fill="url(#whiteChest)"
        />
        {/* Chest Fur Tufts */}
        <path d="M385,555 L398,590 L410,568 L422,590 L435,555 Z" fill="#ffffff" />

        {/* Front Left Leg & 3-Toed Paw */}
        <g id="front-left-leg">
          <ellipse cx="360" cy="615" rx="28" ry="56" fill="url(#craniumVelvet)" transform="rotate(5 360 615)" />
          <ellipse cx="355" cy="685" rx="36" ry="22" fill="#541094" />
          <circle cx="334" cy="692" r="11" fill="#7e26c6" />
          <circle cx="355" cy="695" r="12" fill="#7e26c6" />
          <circle cx="376" cy="692" r="11" fill="#7e26c6" />
          <circle cx="332" cy="688" r="3.8" fill="rgba(255,255,255,0.5)" />
          <circle cx="353" cy="690" r="4.2" fill="rgba(255,255,255,0.5)" />
          <circle cx="374" cy="688" r="3.8" fill="rgba(255,255,255,0.5)" />
        </g>

        {/* Front Right Leg & 3-Toed Paw */}
        <g id="front-right-leg">
          <ellipse cx="465" cy="615" rx="28" ry="56" fill="url(#craniumVelvet)" transform="rotate(-5 465 615)" />
          <ellipse cx="470" cy="685" rx="36" ry="22" fill="#541094" />
          <circle cx="449" cy="692" r="11" fill="#7e26c6" />
          <circle cx="470" cy="695" r="12" fill="#7e26c6" />
          <circle cx="491" cy="692" r="11" fill="#7e26c6" />
          <circle cx="447" cy="688" r="3.8" fill="rgba(255,255,255,0.5)" />
          <circle cx="468" cy="690" r="4.2" fill="rgba(255,255,255,0.5)" />
          <circle cx="489" cy="688" r="3.8" fill="rgba(255,255,255,0.5)" />
        </g>
      </g>

      {/* 4. MASTER 3D HEAD & UPRIGHT EARS (EXACT 12° TILT & ASYMMETRY FROM IMAGE 2) */}
      <g id="master-head-group" transform="translate(405, 385) rotate(-10)">
        {/* Purple Cranium Sphere */}
        <ellipse cx="0" cy="-35" rx="165" ry="140" fill="url(#craniumVelvet)" />

        {/* ------------------------------------------------------------- */}
        {/* TALL UPRIGHT CONICAL 3D FOX EARS (MATCHING IMAGE 2 EXACTLY!)   */}
        {/* ------------------------------------------------------------- */}
        {/* Left Conical Ear: Points UP-LEFT (~52°) */}
        <g id="ear-left" transform="rotate(-24)">
          {/* Purple Outer Shell */}
          <path d="M-65,-75 C-150,-155 -215,-275 -230,-375 C-165,-275 -75,-205 -12,-135 Z" fill="url(#earLOuter)" />
          {/* Specular Ridge Rim Light */}
          <path
            d="M-12,-135 C-75,-205 -165,-275 -230,-375"
            stroke="rgba(244,230,255,0.75)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          {/* Deep Matte Obsidian Ear Hollow */}
          <path d="M-60,-70 C-138,-150 -195,-255 -208,-350 C-152,-255 -68,-190 -16,-128 Z" fill="url(#earHollowL)" />
          {/* White Fur Tuft at Base */}
          <path d="M-52,-95 L-84,-125 L-48,-145 Z" fill="#ffffff" />
        </g>

        {/* Right Conical Ear: Points HIGH UP-RIGHT (~82° - STANDING TALL!) */}
        <g id="ear-right" transform="rotate(18)">
          {/* Purple Outer Shell */}
          <path d="M65,-75 C150,-165 205,-295 215,-400 C155,-295 72,-215 12,-135 Z" fill="url(#earROuter)" />
          {/* Specular Ridge Rim Light */}
          <path
            d="M12,-135 C72,-215 155,-295 215,-400"
            stroke="rgba(244,230,255,0.75)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          {/* Deep Matte Obsidian Ear Hollow */}
          <path d="M60,-70 C138,-158 185,-275 195,-375 C142,-275 66,-200 16,-128 Z" fill="url(#earHollowR)" />
          {/* White Fur Tuft at Base */}
          <path d="M52,-95 L84,-125 L48,-145 Z" fill="#ffffff" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* HUGE PILLOWY CHUBBY WHITE CHEEKS & CHIN                        */}
        {/* Bulges wide to X: ±175, creating the iconic chubby kitten face */}
        {/* ------------------------------------------------------------- */}
        <path
          d="M0,-110 C48,-98 105,-62 155,-22 C210,22 176,112 70,118 C26,120 -26,120 -70,118 C-176,112 -210,22 -155,-22 C-105,-62 -48,-98 0,-110 Z"
          fill="url(#whiteCheeks)"
          filter="url(#dropShadow3D)"
        />

        {/* ------------------------------------------------------------- */}
        {/* FLOWING BLACK WINGED MASK                                      */}
        {/* Connects from both ear cavities, sweeping over the cheeks      */}
        {/* ------------------------------------------------------------- */}
        {/* Left Wing Mask */}
        <path
          d="M-15,-28 C-35,-16 -62,24 -105,24 C-175,24 -205,-22 -185,-65 C-135,-115 -52,-125 -15,-68 Z"
          fill="url(#maskGradL)"
        />
        {/* Right Wing Mask */}
        <path
          d="M15,-28 C35,-16 62,24 105,24 C175,24 205,-22 185,-65 C135,-115 52,-125 15,-68 Z"
          fill="url(#maskGradR)"
        />

        {/* ------------------------------------------------------------- */}
        {/* CENTER WHITE MUZZLE BLAZE                                      */}
        {/* Sweeps upward between eyes with tapering notch on forehead     */}
        {/* ------------------------------------------------------------- */}
        <path d="M0,-125 C20,-90 22,-50 0,-26 C-22,-50 -20,-90 0,-125 Z" fill="#ffffff" />

        {/* ------------------------------------------------------------- */}
        {/* TWO WHITE FOREHEAD MARKS (OVAL EYEBROW SPOTS)                  */}
        {/* ------------------------------------------------------------- */}
        {/* Left Oval Eyebrow Spot */}
        <ellipse cx="-72" cy="-122" rx="16" ry="28" fill="#ffffff" transform="rotate(-20 -72 -122)" />
        {/* Right Tall Oval Eyebrow Spot */}
        <ellipse cx="72" cy="-122" rx="17" ry="30" fill="#ffffff" transform="rotate(18 72 -122)" />

        {/* ------------------------------------------------------------- */}
        {/* 3D INWARD-TILTED ALMOND RUBY GEMSTONE EYES                     */}
        {/* ------------------------------------------------------------- */}
        {!happyEyes ? (
          <>
            {/* Left Ruby Eye (Tilted inward ~22°) */}
            <g transform="translate(-80, -32) rotate(22)" filter="url(#rubyGlow)">
              <path d="M-40,0 C-26,-34 26,-34 40,0 C26,34 -26,34 -40,0 Z" fill="url(#rubyEyeL)" />
              {/* Obsidian Pupil */}
              <ellipse cx="-2" cy="0" rx="16" ry="26" fill="#080103" />
              {/* Main Specular Catchlight (Top-Left 10 o'clock) */}
              <circle cx="-11" cy="-13" r="9" fill="#ffffff" />
              {/* Secondary Glint (Bottom-Right 4 o'clock) */}
              <circle cx="11" cy="8" r="4.5" fill="#ffffff" />
            </g>

            {/* Right Ruby Eye (Tilted inward ~22°) */}
            <g transform="translate(80, -32) rotate(-22)" filter="url(#rubyGlow)">
              <path d="M-40,0 C-26,-34 26,-34 40,0 C26,34 -26,34 -40,0 Z" fill="url(#rubyEyeR)" />
              {/* Obsidian Pupil */}
              <ellipse cx="2" cy="0" rx="16" ry="26" fill="#080103" />
              {/* Main Specular Catchlight (Top-Left 10 o'clock) */}
              <circle cx="-8" cy="-13" r="9" fill="#ffffff" />
              {/* Secondary Glint (Bottom-Right 4 o'clock) */}
              <circle cx="15" cy="8" r="4.5" fill="#ffffff" />
            </g>
          </>
        ) : (
          /* Happy Closed Purr Eyes during Star Absorption */
          <g id="happy-purr-eyes">
            <path
              d="M-108,-26 C-88,-6 -68,-6 -48,-26"
              stroke="#ffffff"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              filter="url(#rubyGlow)"
            />
            <path
              d="M48,-26 C68,-6 88,-6 108,-26"
              stroke="#ffffff"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              filter="url(#rubyGlow)"
            />
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* NOSE & POUTY FELINE MOUTH (MATCHING IMAGE 2'S POUT!)          */}
        {/* ------------------------------------------------------------- */}
        {/* Tiny Charcoal Button Nose */}
        <path d="M0,24 L-15,8 C-15,8 -8,6 0,6 C8,6 15,8 15,8 Z" fill="#221a28" />
        {/* Philtrum Cleft & Downturned Pout */}
        <path
          d="M0,24 L0,38 M-20,48 C-10,36 0,38 0,38 C0,38 10,36 20,48"
          stroke="#1a1220"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
