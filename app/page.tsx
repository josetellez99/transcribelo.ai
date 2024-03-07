'use client'

import React from "react";
import { Textarea } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import OpenAI from "openai";
import { Button } from "@nextui-org/react";


export default function Home() {

  const [value, setValue] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [availableDowload, setAvailableDownload] = React.useState(false);
  const [audio, setAudio] = React.useState<null | HTMLAudioElement>(null)
  
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setAvailableDownload(false)
    setAudio(null)
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audio!.src;
    link.download = 'audio.mp3'; // Choose the file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleGetAudio = async () => {

    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "shimmer",
      input: value,
    });

    if(mp3.ok) {
      const blob = await mp3.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      setAudio(audio)
      setAvailableDownload(true)
    }   
  }


  return (
    <div className="w-[600px]">
      <h1 className="text-center font-bold text-4xl mb-8">Type your text and get the audio</h1>
      <p>Please, enter your API KEY in the following field</p>
      <Input 
        label="Openai API KEY" 
        size="sm" 
        className="max-w-[500px] mb-4"
        value={apiKey}
        onValueChange={setApiKey}
      />
      <p className="mb-4">
        This service relies on openai API. So you must to set your personal API KEY. You can find it out in the openai platform 
        {'   ->   '} 
        <Link 
          href="https://platform.openai.com/api-keys"
          target="_blank"
        >
          Openai Platform
        </Link> 
      </p>

      <Textarea 
        placeholder="Type something..." 
        size="lg"
        minRows={50}
        fullWidth
        value={value}
        onChange={handleTextAreaChange}
        className="mb-4"
      />
      <div className="w-full flex justify-between mb-4">
        <Button 
          className="w-[30%]"
          color="primary"
          onClick={handleDownload}
          isDisabled={!availableDowload}
        >
          Download
        </Button>
        <Button 
          className="w-[30%]"
          color="primary"
          onClick={handleGetAudio}
        >
          Get audio
        </Button>
      </div>
      <div className="flex justify-center">
          {audio && (
            <audio controls src={audio.src} />
          )}
      </div>
    </div>
  );
}
