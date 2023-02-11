import { useEffect } from "react";

const Story = () => {
    useEffect(() => window.scrollTo(0, 0), []);
    return (
        <section className="py-20 mx-auto px-8 max-w-4xl text-justify">
            <span className="text-2xl">Interesting story about the font used here...</span>
            <br /><br />
            It's called 'Liberation Mono' and of course it's free and open source font used in linux based systems.
            But I first noticed while using Google Docs and I was like "hey this font looks pretty cool". 
            Let's use this font for any upcoming project if it is free to use and as later it turned out it was.
            <br /><br />
            Now what you have to remember is by that time I had switched to Fedora (a linux distro), specifically Ultramarine which is fedora based, you guys should definitely check it out (OMG the gestures).
            Now the reason this detail is important is because of the next part of the story.
            <br /><br />
            So when I got this project, I remembered that font and I was like "hey I should use that font for this project". 
            So I searched online for the font that was given in the google docs which was showing 'Courier New'. 
            So naturally I downloaded that and I didn't realize that it was not the font that I wanted until I tried using it.
            <br /><br />
            And I was like "okay this is awkward" because google docs is showing something else and on my system it's something else.
            I checked the network tab of google docs, nope nothing there. There was no mention of this font.
            I asked for help from my friends and they all looked in the matter and 2 hours into the web searching no progress whatsoever. 
            Online font checkers and everything, nothing. 
            <br /><br />
            Then one of my friend suggested thet if this font is not in the network tabs that means it is a system font.
            But if other people are getting different results then it is possible that because of non availability of the said font 'Courier New', google docs is going on to a fallback.
            Like duh! I should have thought of that but didn't. Hey that's what are friends for right!
            <br /><br />
            So the moral of the story is that you should make good friends and if you have linux then you should probably search for system fonts first in this situation or you'll end up going on google forums.
            <br /><br />
            P.S. being a programmer is fun and having programmer friends is even more fun. 
            Btw these are my friends who helped me in finding this font.&nbsp;
            <a className="underline underline-offset-4 hover:text-green-dark hover:decoration-green-dark" href="https://github.com/VaibhavSharma-v" target="_blank" rel="noreferrer">VaibhavSharma-v</a>,&nbsp;
            <a className="underline underline-offset-4 hover:text-green-dark hover:decoration-green-dark" href="https://github.com/sumqwerty" target="_blank" rel="noreferrer">Sumqwerty</a>,&nbsp;
            <a className="underline underline-offset-4 hover:text-green-dark hover:decoration-green-dark" href="http://github.com/nsafter" target="_blank" rel="noreferrer">Nsafter</a> &&nbsp; 
            <a className="underline underline-offset-4 hover:text-green-dark hover:decoration-green-dark" href="https://github.com/UjjwalSk" target="_blank" rel="noreferrer">UjjwalSk</a>, please go and check out their profile.
            <br /><br />
            <span><a className="italic font-bold underline underline-offset-4 hover:text-green-dark hover:decoration-green-dark" href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">CinematicGenius007</a></span>
        </section>
    );
};

export default Story;