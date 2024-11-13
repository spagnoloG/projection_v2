/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex("lyrics").insert([
    {
      title: "Wandering Minds",
      content: JSON.stringify({
        refren:
          "<p>In the shadows, wandering free<br>Chasing the echoes of a memory<br>A restless soul without a guide<br>Searching for meaning far and wide</p>",
        kitice: [
          "<p>Walking down empty streets<br>Where silence and the shadows meet<br>I hear the whispers in the dark<br>Of dreams that flicker, then depart</p>",
          "<p>Underneath the starlit skies<br>Questions fill my wandering eyes<br>A journey forged on hope and pain<br>In search of sun after the rain</p>",
        ],
      }),
      categories: ["Alternative", "Indie"],
    },
    {
      title: "Electric Heartbeat",
      content: JSON.stringify({
        refren:
          "<p>Feel the beat, electric flow<br>Pulsing deep, just let it show<br>Heart's alive with every spark<br>Dancing through the night's dark</p>",
        kitice: [
          "<p>Plug into the rhythm's light<br>Sparking dreams within the night<br>Every pulse a brand new start<br>Burning bright in every heart</p>",
        ],
      }),
      categories: ["Pop", "Electronic"],
    },
    {
      title: "Celestial Dreams",
      content: JSON.stringify({
        refren:
          "<p>Stars align, guiding the way<br>In dreams that never fade away<br>Celestial light, forever free<br>In cosmic dance, eternally</p>",
        kitice: [
          "<p>Through the night, we soar high<br>Lost in the beauty of the sky<br>Unbound by time, unchained by fate<br>In endless space, we resonate</p>",
        ],
      }),
      categories: ["Ambient", "Chill"],
    },
    {
      title: "Whispers in the Wind",
      content: JSON.stringify({
        refren:
          "<p>Echoes carried in the breeze<br>Whispers lost among the trees<br>Secrets of the ages past<br>In the winds, forever cast</p>",
        kitice: [
          "<p>Leaves that dance, stories told<br>Of memories that never grow old<br>A soft reminder, gentle and true<br>Of days gone by, skies once blue</p>",
        ],
      }),
      categories: ["Folk"],
    },
    {
      title: "Urban Nightscape",
      content: JSON.stringify({
        refren:
          "<p>City lights, a constant hum<br>In this night, we come undone<br>Rhythms pulse, streets alive<br>In neon glow, we survive</p>",
        kitice: [
          "<p>Under shadows, secrets hide<br>In bustling streets, we confide<br>Stories told through silent eyes<br>Of hopes and dreams that never die</p>",
        ],
      }),
      categories: ["Jazz", "Blues"],
    },
    {
      title: "Lost Horizons",
      content: JSON.stringify({
        refren:
          "<p>Waves crashing on distant shores<br>Guiding us to ever more<br>Through fog and mist, we roam<br>Searching for a place called home</p>",
        kitice: [
          "<p>Seas that call, horizons vast<br>A journey boundless, built to last<br>With every tide, our hearts sway<br>In search of light beyond the gray</p>",
        ],
      }),
      categories: ["Acoustic", "Folk"],
    },
    {
      title: "Midnight Revelry",
      content: JSON.stringify({
        refren:
          "<p>Dance beneath the midnight sky<br>With stars that sparkle, never shy<br>In this hour, hearts are light<br>We revel till the break of night</p>",
        kitice: [
          "<p>Music plays, spirits rise<br>Beneath the cover of moonlit skies<br>A night of joy, laughter unbound<br>In midnight revelry, we’re found</p>",
        ],
      }),
      categories: ["Dance", "Pop"],
    },
    {
      title: "Timeless Echoes",
      content: JSON.stringify({
        refren:
          "<p>Echoes of time, forever near<br>Reminding us of what we hold dear<br>A melody from days gone by<br>Bringing tears, a longing sigh</p>",
        kitice: [
          "<p>Memories in each refrain<br>Sweet and sad, joy and pain<br>In every note, lives a tale<br>Of love and loss that never pales</p>",
        ],
      }),
      categories: ["Classical", "Instrumental"],
    },
    {
      title: "Eternal Wanderlust",
      content: JSON.stringify({
        refren:
          "<p>Roads unknown, calling me<br>With a promise to be free<br>Eternal wanderlust inside<br>In open spaces, I confide</p>",
        kitice: [
          "<p>Mountains high, valleys low<br>In every path, the world I know<br>A journey endless, born to roam<br>The earth, my heart, my only home</p>",
        ],
      }),
      categories: ["Country", "Folk"],
    },
    {
      title: "Silent Storm",
      content: JSON.stringify({
        refren:
          "<p>Thunder rolls without a sound<br>In silence, strength is found<br>Clouds of gray, skies so torn<br>The calm before the silent storm</p>",
        kitice: [
          "<p>Eyes that see but do not speak<br>In moments fierce, yet sweet<br>A silent storm, emotions bare<br>With quiet strength, beyond compare</p>",
        ],
      }),
      categories: ["Alternative", "Ambient"],
    },
    {
      title: "Endless Roads",
      content: JSON.stringify({
        refren:
          "<p>Step by step, mile by mile<br>We journey on, through trial<br>Endless roads stretch far and wide<br>With hope and courage as our guide</p>",
        kitice: [
          "<p>In each step, a tale unfolds<br>Of dreams pursued, of legends told<br>Endless roads beneath our feet<br>In every path, the world we meet</p>",
        ],
      }),
      categories: ["Country"],
    },
    {
      title: "Mountain Echo",
      content: JSON.stringify({
        refren:
          "<p>From peaks above, voices call<br>Across the mountains, strong and tall<br>A harmony in valleys deep<br>Through winds that sing as shadows creep</p>",
        kitice: [
          "<p>Echoes of the ages past<br>In every stone, a shadow cast<br>From mountains high, tales descend<br>Of nature’s beauty without end</p>",
        ],
      }),
      categories: ["Folk"],
    },
    {
      title: "Sky of Fire",
      content: JSON.stringify({
        refren:
          "<p>The sky’s ablaze, red and bright<br>In the beauty of fading light<br>Colors merge as night descends<br>In fiery glow, the daylight ends</p>",
        kitice: [
          "<p>Burning hues of red and gold<br>A masterpiece that’s uncontrolled<br>As stars awake, the fire fades<br>Leaving night in gentle shades</p>",
        ],
      }),
      categories: ["Ambient"],
    },
    {
      title: "Ocean’s Lullaby",
      content: JSON.stringify({
        refren:
          "<p>Rocked by waves, soft and slow<br>As moonlight casts a gentle glow<br>In the ocean’s lullaby<br>Peaceful dreams begin to lie</p>",
        kitice: [
          "<p>Beneath the sea, mysteries hide<br>In waves that rise with every tide<br>Ocean’s song, soft and low<br>A lullaby that we all know</p>",
        ],
      }),
      categories: ["Chill", "Acoustic"],
    },
    {
      title: "Trail of Stars",
      content: JSON.stringify({
        refren:
          "<p>A trail of stars across the night<br>Guiding us with gentle light<br>In every star, a wish untold<br>In every spark, a tale of old</p>",
        kitice: [
          "<p>Follow the stars, across the sky<br>On wings of hope, we fly high<br>A universe so vast and deep<br>With secrets only stars can keep</p>",
        ],
      }),
      categories: ["Classical", "Ambient"],
    },
    {
      title: "City Pulse",
      content: JSON.stringify({
        refren:
          "<p>The city’s heartbeat never dies<br>In neon glow, beneath dark skies<br>Every street a story told<br>In whispers bold, in secrets cold</p>",
        kitice: [
          "<p>Skyscrapers reaching for the stars<br>Through bustling streets and passing cars<br>The city lives, it breathes, it grows<br>In lights that dance and rivers flow</p>",
        ],
      }),
      categories: ["Electronic", "Pop"],
    },
    {
      title: "Rain and Reflection",
      content: JSON.stringify({
        refren:
          "<p>Raindrops fall, soft and pure<br>A mirror of the world obscure<br>In every drop, a reflection lies<br>Of fleeting thoughts and cloudy skies</p>",
        kitice: [
          "<p>Windows wet, reflections clear<br>Of memories that linger near<br>In rain and thought, we find our way<br>Through quiet nights and stormy days</p>",
        ],
      }),
      categories: ["Jazz", "Blues"],
    },
    {
      title: "Wind’s Embrace",
      content: JSON.stringify({
        refren:
          "<p>The wind whispers, soft and low<br>Through fields of green where flowers grow<br>In gentle embrace, it brings delight<br>In morning’s warmth, in evening’s light</p>",
        kitice: [
          "<p>Through valleys deep, on wings of grace<br>It carries secrets from place to place<br>The wind’s embrace, so light, so free<br>A dance of love, eternally</p>",
        ],
      }),
      categories: ["Folk", "Acoustic"],
    },
    {
      title: "Silent Reflections",
      content: JSON.stringify({
        refren:
          "<p>In silence deep, we hear the call<br>Of dreams that rise, of hopes that fall<br>Through quiet thought, we find our truth<br>In silent reflections of youth</p>",
        kitice: [
          "<p>A moment’s peace, a gentle sigh<br>As days and nights go drifting by<br>In quiet moments, we uncover<br>Secrets kept, fears to discover</p>",
        ],
      }),
      categories: ["Instrumental", "Ambient"],
    },
    {
      title: "Rise of Dawn",
      content: JSON.stringify({
        refren:
          "<p>The sun breaks through, a brand new day<br>Chasing the night’s shadows away<br>With every dawn, hope reborn<br>In the light of early morn</p>",
        kitice: [
          "<p>With colors bold, the sky unfolds<br>A story bright, a tale retold<br>Each dawn we greet, a chance to start<br>With open mind and hopeful heart</p>",
        ],
      }),
      categories: ["Pop", "Electronic"],
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex("lyrics")
    .del()
    .where("title", "in", [
      "Wandering Minds",
      "Electric Heartbeat",
      "Celestial Dreams",
      "Whispers in the Wind",
      "Urban Nightscape",
      "Lost Horizons",
      "Midnight Revelry",
      "Timeless Echoes",
      "Eternal Wanderlust",
      "Silent Storm",
      "Endless Roads",
      "Mountain Echo",
      "Sky of Fire",
      "Ocean’s Lullaby",
      "Trail of Stars",
      "City Pulse",
      "Rain and Reflection",
      "Wind’s Embrace",
      "Silent Reflections",
      "Rise of Dawn",
    ]);
};
