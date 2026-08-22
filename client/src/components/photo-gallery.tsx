import { useState } from "react";
import { motion } from "framer-motion";
import { X, Mail, Linkedin, MapPin, Images } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  objectPosition?: string;
};

const photoGroups: { name: string; description: string; photos: Photo[] }[] = [
  {
    name: "Live Sessions & Studio",
    description: "In the room for intimate performances and recording sessions.",
    photos: [
      {
        id: "jim-james",
        src: "/attached_assets/gallery/jim-james-session.jpg",
        alt: "Jim James studio session",
        caption: "Jim James (My Morning Jacket) — studio session",
        category: "Live Sessions & Studio",
      },
      {
        id: "bad-marriage-writing",
        src: "/attached_assets/gallery/bad-marriage-writing-session.jpg",
        alt: "The Bad Marriage writing session during On The Mountain Season 3",
        caption: "The Bad Marriage — writing session, On The Mountain S3",
        category: "Live Sessions & Studio",
      },
      {
        id: "wilsen-otm",
        src: "/attached_assets/gallery/wilsen-otm-session.jpg",
        alt: "Wilsen performing during On The Mountain Season 2",
        caption: "Wilsen — performing \"Final\" and \"Garden\", On The Mountain S2",
        category: "Live Sessions & Studio",
        objectPosition: "35% 12%",
      },
      {
        id: "talib-kweli",
        src: "/attached_assets/gallery/talib-kweli-session.jpg",
        alt: "Talib Kweli at Area 51 NYC studios with Michelle Williams",
        caption: "Talib Kweli — at Area 51 NYC, with Michelle Williams (Destiny's Child)",
        category: "Live Sessions & Studio",
      },
      {
        id: "mikaela-davis",
        src: "/attached_assets/gallery/mikaela-davis-color-correction.jpg",
        alt: "Mikaela Davis session, color correction pass",
        caption: "Mikaela Davis — filming at YouTube Studios NYC",
        category: "Live Sessions & Studio",
      },
      {
        id: "san-fermin-table-setup",
        src: "/attached_assets/gallery/san-fermin-table-setup.jpg",
        alt: "Pre-show setup for the San Fermin Sonos Buzzsession",
        caption: "San Fermin — Sonos Buzzsession event",
        category: "Live Sessions & Studio",
      },
    ],
  },
  {
    name: "Festivals & Live Events",
    description: "Multi-day activations, festival production, and the crowds that showed up.",
    photos: [
      {
        id: "calliope",
        src: "/attached_assets/gallery/calliope-musicals-live.jpg",
        alt: "Calliope Musicals performing live at Welcome Campers Season 4",
        caption: "Calliope Musicals — live at Welcome Campers S4",
        category: "Festivals & Live Events",
      },
      {
        id: "bad-marriage-performance",
        src: "/attached_assets/gallery/bad-marriage-otm-performance.jpg",
        alt: "The Bad Marriage performing during On The Mountain Season 3",
        caption: "The Bad Marriage — performance, On The Mountain S3",
        category: "Festivals & Live Events",
      },
      {
        id: "wc-basketball",
        src: "/attached_assets/gallery/welcome-campers-basketball.jpg",
        alt: "Pickup basketball at Welcome Campers Season 4",
        caption: "Welcome Campers S4 — pickup basketball",
        category: "Festivals & Live Events",
      },
      {
        id: "wc-crowd",
        src: "/attached_assets/gallery/welcome-campers-crowd.jpg",
        alt: "Welcome Campers Season 3 crowd moment",
        caption: "Welcome Campers S3 — crowd moment",
        category: "Festivals & Live Events",
      },
      {
        id: "seatgeek-judah-friedlander",
        src: "/attached_assets/gallery/seatgeek-judah-friedlander-commercial.jpg",
        alt: "Behind the scenes of a SeatGeek MLS All-Star commercial with Judah Friedlander",
        caption: "SeatGeek MLS All-Star commercial — with Judah Friedlander",
        category: "Festivals & Live Events",
      },
      {
        id: "wc-schedule",
        src: "/attached_assets/gallery/welcome-campers-schedule.jpg",
        alt: "Welcome Campers Season 4 festival schedule",
        caption: "Welcome Campers S4 — full weekend run-of-show",
        category: "Festivals & Live Events",
      },
    ],
  },
  {
    name: "Campaign Art",
    description: "Original illustrated art commissioned from artists to promote each session and event.",
    photos: [
      {
        id: "cage-poster",
        src: "/attached_assets/gallery/cage-the-elephant-poster.jpg",
        alt: "Wild Honey Pie Buzzsession poster for Cage The Elephant",
        caption: "Wild Honey Pie Buzzsession — Cage The Elephant",
        category: "Campaign Art",
      },
      {
        id: "kevin-garrett-poster",
        src: "/attached_assets/gallery/kevin-garrett-poster.jpg",
        alt: "Wild Honey Pie Buzz Session poster for Kevin Garrett",
        caption: "Wild Honey Pie Buzz Session — Kevin Garrett",
        category: "Campaign Art",
      },
      {
        id: "on-the-boat",
        src: "/attached_assets/gallery/on-the-boat-poster.jpg",
        alt: "On The Boat at Newport Folk poster",
        caption: "On The Boat — at Newport Folk",
        category: "Campaign Art",
      },
      {
        id: "house-party",
        src: "/attached_assets/gallery/melogold-house-party-poster.jpg",
        alt: "Melogold House Party poster",
        caption: "Melogold & The Circus On The Moon — The House Party",
        category: "Campaign Art",
      },
      {
        id: "grateful-brunch",
        src: "/attached_assets/gallery/grateful-brunch-poster.jpg",
        alt: "Grateful Brunch illustrated poster",
        caption: "Grateful Brunch — illustrated key art",
        category: "Campaign Art",
      },
      {
        id: "wild-child-house-party",
        src: "/attached_assets/gallery/wild-child-house-party-poster.jpg",
        alt: "Wild Child & Friends House Party poster",
        caption: "Wild Child & Friends — House Party, Narragansett",
        category: "Campaign Art",
      },
      {
        id: "beehive-northside",
        src: "/attached_assets/gallery/beehive-northside-poster.jpg",
        alt: "The Beehive at Northside Festival poster",
        caption: "The Beehive — at Northside Festival",
        category: "Campaign Art",
      },
      {
        id: "beehive-sxsw",
        src: "/attached_assets/gallery/beehive-sxsw-poster.jpg",
        alt: "The Beehive at SXSW poster",
        caption: "The Beehive — at SXSW",
        category: "Campaign Art",
      },
      {
        id: "matt-corby-tour",
        src: "/attached_assets/gallery/matt-corby-tour-poster.jpg",
        alt: "Matt Corby Telluric Tour poster",
        caption: "Matt Corby — Telluric Tour",
        category: "Campaign Art",
      },
      {
        id: "other-lives-buzzsession",
        src: "/attached_assets/gallery/other-lives-buzzsession-poster.jpg",
        alt: "Other Lives Buzzsession poster, a collaboration with Sonos",
        caption: "Other Lives Buzzsession — with Sonos",
        category: "Campaign Art",
      },
      {
        id: "san-fermin-buzzsession",
        src: "/attached_assets/gallery/san-fermin-buzzsession-poster.jpg",
        alt: "San Fermin Buzzsession poster, a collaboration with Sonos",
        caption: "San Fermin Buzzsession — with Sonos",
        category: "Campaign Art",
      },
      {
        id: "spooky-mansion-poster",
        src: "/attached_assets/gallery/spooky-mansion-poster.jpg",
        alt: "Spooky Mansion immersive concert poster",
        caption: "Spooky Mansion — immersive concert experience",
        category: "Campaign Art",
      },
      {
        id: "the-wick-lineup",
        src: "/attached_assets/gallery/the-wick-lineup-poster.jpg",
        alt: "The Wick lineup poster featuring Frankie Cosmos and Phony Ppl",
        caption: "The Wick — full lineup poster",
        category: "Campaign Art",
      },
      {
        id: "welcome-campers-s3-poster",
        src: "/attached_assets/gallery/welcome-campers-s3-poster.jpg",
        alt: "Welcome Campers Season 3 poster",
        caption: "Welcome Campers — Season 3 key art",
        category: "Campaign Art",
      },
      {
        id: "phox-on-the-house",
        src: "/attached_assets/gallery/phox-on-the-house-poster.jpg",
        alt: "Phox On The House poster",
        caption: "Phox — On The House",
        category: "Campaign Art",
      },
      {
        id: "banners-sidebar",
        src: "/attached_assets/gallery/banners-sidebar-poster.jpg",
        alt: "Banners at Sidebar SXSW lineup poster",
        caption: "Banners — at Sidebar, SXSW",
        category: "Campaign Art",
      },
    ],
  },
];

export default function PhotoGallery({ embedded = false }: { embedded?: boolean }) {
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className={embedded ? "py-6 px-4 sm:px-6" : "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"}>
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center sm:mb-14"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-600">
              <Images className="h-3 w-3 text-accent" />
              Behind the Scenes
            </div>
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A closer look at the work in the room.
            </h1>
            <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
              Sessions, sets, and the campaign art produced alongside them.
            </p>
          </motion.div>
        )}

        <div className="space-y-10 sm:space-y-14">
          {photoGroups.map((group) => (
            <div key={group.name}>
              <div className="mb-4 sm:mb-5">
                <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {group.photos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
                    onClick={() => setOpenPhoto(photo)}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      style={{ objectPosition: photo.objectPosition ?? "center" }}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="truncate text-xs font-medium text-white">{photo.caption}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm sm:mt-16 sm:p-6"
        >
          <p className="mb-3 text-sm font-semibold text-gray-900">Let's connect</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <a href="mailto:jlurie.12@gmail.com" className="flex items-center gap-1.5 hover:text-gray-900 hover:underline">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              jlurie.12@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jlurie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 hover:underline"
            >
              <Linkedin className="h-3.5 w-3.5 text-gray-400" />
              linkedin.com/in/jlurie
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              Los Angeles, CA
            </span>
          </div>
        </motion.div>
      </div>

      <Dialog open={!!openPhoto} onOpenChange={(open) => !open && setOpenPhoto(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[88vh] overflow-hidden rounded-[24px] p-0">
          <DialogTitle className="sr-only">{openPhoto?.caption}</DialogTitle>
          <DialogDescription className="sr-only">{openPhoto?.alt}</DialogDescription>
          {openPhoto && (
            <div className="relative">
              <button
                onClick={() => setOpenPhoto(null)}
                className="absolute top-4 right-4 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <X size={20} />
              </button>
              <img src={openPhoto.src} alt={openPhoto.alt} className="max-h-[70vh] w-full object-contain bg-black" />
              <div className="p-4 sm:p-6">
                <div className="mb-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-600">
                  {openPhoto.category}
                </div>
                <p className="text-base font-medium text-gray-900">{openPhoto.caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
