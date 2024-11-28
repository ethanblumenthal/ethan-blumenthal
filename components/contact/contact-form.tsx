"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    details: "",
    timeline: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-12">
      <div className="grid md:grid-cols-[2fr,1fr] gap-12">
        <div className="space-y-8">
          <div className="rounded-lg border border-dashed border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Project Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-white mb-2 block">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Jane Smith"
                  className="bg-gray-900/50 border-gray-800"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  className="bg-gray-900/50 border-gray-800"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="website" className="text-white mb-2 block">
                  Existing website (optional)
                </label>
                <Input
                  id="website"
                  placeholder="Website URL"
                  className="bg-gray-900/50 border-gray-800"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="details" className="text-white mb-2 block">
                  Project details
                </label>
                <Textarea
                  id="details"
                  placeholder="Web design..."
                  className="bg-gray-900/50 border-gray-800 min-h-[150px]"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="timeline" className="text-white mb-2 block">
                  Project timeline
                </label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                >
                  <SelectTrigger className="bg-gray-900/50 border-gray-800">
                    <SelectValue placeholder="Select timeline..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2-months">1-2 months</SelectItem>
                    <SelectItem value="3-4-months">3-4 months</SelectItem>
                    <SelectItem value="6-months">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Let's Connect</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                onClick={() => navigator.clipboard.writeText('ethan.blumenthal@gmail.com')}
              >
                <span className="truncate">ethan.blumenthal@gmail.com</span>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50"
              >
                Book a Call
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Follow Me</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  X/Twitter
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-800 bg-gray-900/50 justify-start"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
