import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import DateCalendar from "./DateCalendar";
import { useCastleListing } from "@/contexts/CastleListingContext";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import AddGuestsCounter from "./AddGuestsCounter";
import { eachDayOfInterval, format } from "date-fns";

import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/ui/shadcn-io/tags";

import { CheckIcon } from "lucide-react";
import RoomCard from "./RoomCard";
import axios from "@/axios_api/axios";
import { useUser } from "@/contexts/UserContext";

type UpdateListingFormProps = {
  castle: CastleListing;
  listingEditorHandler: (castle: CastleListing) => void;
  setIsListingUpdated: Dispatch<SetStateAction<boolean>>;
};

const UpdateListingForm = ({
  castle,
  listingEditorHandler,
  setIsListingUpdated,
}: UpdateListingFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ListingInputs>({
    defaultValues: {
      title: castle.title,
      images: castle.images,
      location: castle.location,
      description: castle.description,
      amneties: castle.amneties,
      rules: castle.rules,
      dates: {
        from: new Date(castle.dates[0]),
        to: new Date(castle.dates[castle.dates.length - 1]),
      },
      guests: castle.guests,
      rooms: castle.rooms,
      events: castle.events,
    },
  });

  const { token } = useUser();
  const { actions } = useCastleListing();

  const [formError, setFormError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [selectedAmneties, setSelectedAmneties] = useState<string[]>([
    ...(castle.amneties as string[]),
  ]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    ...(castle.events as string[]),
  ]);
  const [selectedRules, setSelectedRules] = useState<string[]>([
    ...castle.rules,
  ]);
  const selectedRooms: Room[] = [...castle.rooms];

  const amneties = [
    { id: "pets_allowed", label: "Pets allowed" },
    { id: "breakfast_included", label: "Breakfast included" },
    { id: "lunch_included", label: "Lunch included" },
    { id: "gym_nearby", label: "Gym nearby" },
  ];

  const events = [
    { id: "ghost_hunting", label: "Ghost hunting" },
    { id: "dance_party", label: "Dance party" },
    { id: "photoshoot", label: "Photoshoot" },
    { id: "guided_tour", label: "Guided tour" },
  ];

  const rules = [{ id: "no_smoking", label: "No smoking" }];

  const rooms: Room[] = [
    {
      title: "Luxury room",
      caption: "Lorem ipsum",
      description: ["Lorem ipsum"],
      price: 350,
    },
    {
      title: "Deluxe room",
      caption: "Lorem ipsum",
      description: ["Lorem ipsum"],
      price: 400,
    },
    {
      title: "Tower Room",
      caption: "Lorem ipsum",
      description: ["Lorem ipsum"],
      price: 300,
    },
  ];

  function compareArrays<T>(a: Array<T>, b: Array<T>): boolean {
    const array1 = a.sort();
    const array2 = b.sort();

    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  const getDatesInRange = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    if (startDate !== undefined && endDate !== undefined) {
      return eachDayOfInterval({
        start: startDate,
        end: endDate,
      });
    }
  };

  const handleRemove = (type: string, value: string) => {
    if (type == "amnety") {
      if (!selectedAmneties.includes(value)) {
        return;
      }
      const newArray = selectedAmneties;
      let index = newArray.indexOf(value);
      newArray.splice(index, 1);

      setSelectedAmneties((prev) => prev.filter((v) => v !== value));

      return newArray;
    } else if (type == "event") {
      if (!selectedEvents.includes(value)) {
        return;
      }
      const newArray = selectedEvents;
      let index = newArray.indexOf(value);
      newArray.splice(index, 1);

      setSelectedEvents((prev) => prev.filter((v) => v !== value));

      return newArray;
    } else if (type == "rule") {
      if (!selectedRules.includes(value)) {
        return;
      }
      const newArray = selectedRules;
      let index = newArray.indexOf(value);
      newArray.splice(index, 1);

      setSelectedRules((prev) => prev.filter((v) => v !== value));

      return newArray;
    }
  };

  const handleSelect = (type: string, value: string) => {
    if (type == "amnety") {
      if (selectedAmneties.includes(value)) {
        handleRemove(type, value);
        return;
      }

      setSelectedAmneties((prev) => [...prev, value]);

      const newArray = selectedAmneties;
      newArray.push(value);

      return newArray;
    } else if (type == "event") {
      if (selectedEvents.includes(value)) {
        handleRemove(type, value);
        return;
      }

      setSelectedEvents((prev) => [...prev, value]);

      const newArray = selectedEvents;
      newArray.push(value);

      return newArray;
    } else if (type == "rule") {
      if (selectedRules.includes(value)) {
        handleRemove(type, value);
        return;
      }

      setSelectedRules((prev) => [...prev, value]);

      const newArray = selectedRules;
      newArray.push(value);

      return newArray;
    }
  };

  const handleRoomsSelect = (room: Room) => {
    if (selectedRooms.find((r) => r.title == room.title) == undefined) {
      selectedRooms.push(room);

      return selectedRooms;
    } else {
      const index = selectedRooms.findIndex((r) => r.title == room.title);
      selectedRooms.splice(index, 1);

      return selectedRooms;
    }
  };

  const handleUpdateFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let files = e.target.files;

    if (files) {
      const images = await imagebase64(files);

      return images;
    }
  };

  const imagebase64 = async (files: FileList) => {
    // Turn several files into Base64 format: https://stackoverflow.com/a/67296403
    let newFiles = Array.from(files).map((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });
    });

    const res = await Promise.all(newFiles);
    return res;
  };

  const onSubmit: SubmitHandler<ListingInputs> = async (
    data: ListingInputs
  ) => {
    if (
      !data.title ||
      !data.images ||
      !data.location ||
      !data.description ||
      !data.rules ||
      !data.dates ||
      !data.guests ||
      !data.rooms
    ) {
      setFormError("Please fill in all required fields");
      console.log("Please fill in all required fields");
      return;
    }

    const allDatesInRange = getDatesInRange(data.dates.from, data.dates.to);

    const formattedDatesInRange = allDatesInRange?.map((date) => {
      return format(date, "yyyy-MM-dd");
    });

    const updatedData = {} as ListingInputs;

    if (castle.title !== data.title) {
      updatedData.title = data.title;
    }
    if (!compareArrays(castle.images, data.images)) {
      updatedData.images = data.images;
    }
    if (castle.location !== data.location) {
      updatedData.location = data.location;
    }
    if (castle.description !== data.description) {
      updatedData.description = data.description;
    }
    if (!compareArrays(castle.rules, data.rules)) {
      updatedData.rules = data.rules;
    }
    if (
      data.dates &&
      !compareArrays(castle.dates, formattedDatesInRange as string[])
    ) {
      updatedData.dates = data.dates;
    }
    if (!compareArrays(castle.guests, data.guests)) {
      updatedData.guests = data.guests;
    }
    if (!compareArrays(castle.rooms, data.rooms)) {
      updatedData.rooms = data.rooms;
    }
    if (
      castle.events &&
      data.events &&
      !compareArrays(castle.events, data.events)
    ) {
      updatedData.events = data.events;
    }
    if (
      castle.amneties &&
      data.amneties &&
      !compareArrays(castle.amneties, data.amneties)
    ) {
      updatedData.amneties = data.amneties;
    }

    let dataToSubmit = {};

    if (updatedData.dates) {
      dataToSubmit = { ...updatedData, dates: formattedDatesInRange };
    } else {
      dataToSubmit = { ...updatedData };
    }

    try {
      const res = await axios.put(`api/listings/${castle._id}`, dataToSubmit, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        actions.updateListing(res.data);
        console.log("Castle updated!");
        setFormError("");
        setIsSubmitted(true);
        listingEditorHandler(res.data);
        setIsListingUpdated((isListingUpdated) => !isListingUpdated);
      }

      return;
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Something went wrong");
      console.log(error.response?.data?.message || "Something went wrong");
    }

    return;
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      >
        <div>
          <h3>Name of castle</h3>
          <input
            type="title"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title && errors.title.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter a name for the castle
            </p>
          )}
        </div>
        <div>
          <h3>Location</h3>
          <input
            type="location"
            id="location"
            {...register("location", { required: true })}
          />

          {errors.location && errors.location.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter the castle's location
            </p>
          )}
        </div>
        <div>
          <h3>Description</h3>
          <input
            type="description"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && errors.description.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter a description for the castle
            </p>
          )}
        </div>
        <div>
          <h3>Set avaliable dates</h3>
          <Controller
            name="dates"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DateCalendar
                onChange={onChange} // send value to hook form
                selected={value}
              />
            )}
          />

          {errors.dates && errors.dates.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter a start date and final date
            </p>
          )}
        </div>
        <div>
          <h3>Set maximum of guests per booking</h3>

          <Controller
            name="guests"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <AddGuestsCounter
                onChange={onChange} // send value to hook form
                selected={value}
              />
            )}
          />

          {errors.guests && errors.guests.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter at least one maximum amount of guests
            </p>
          )}
        </div>
        <div>
          <h3>Add at least one room</h3>

          <Controller
            name="rooms"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <RoomCard
                  room={rooms[0]}
                  onChange={() => {
                    onChange(handleRoomsSelect(rooms[0]));
                  }} // send value to hook form
                  selected={rooms[0]}
                  isBookingRoom={false}
                  isRoomInCastleListing={
                    selectedRooms.find((r) => r.title == rooms[0].title) ==
                    undefined
                      ? false
                      : true
                  }
                />
                <RoomCard
                  room={rooms[1]}
                  onChange={() => {
                    onChange(handleRoomsSelect(rooms[1]));
                  }} // send value to hook form
                  selected={rooms[1]}
                  isBookingRoom={false}
                  isRoomInCastleListing={
                    selectedRooms.find((r) => r.title == rooms[1].title) ==
                    undefined
                      ? false
                      : true
                  }
                />
                <RoomCard
                  room={rooms[2]}
                  onChange={() => {
                    onChange(handleRoomsSelect(rooms[2]));
                  }} // send value to hook form
                  selected={rooms[2]}
                  isBookingRoom={false}
                  isRoomInCastleListing={
                    selectedRooms.find((r) => r.title == rooms[2].title) ==
                    undefined
                      ? false
                      : true
                  }
                />
              </>
            )}
          />
          {errors.rooms && errors.rooms.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Pick at least one room for the castle
            </p>
          )}
        </div>

        <div>
          <h3>What amneties do you offer?</h3>
          <Controller
            name="amneties"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Tags className="max-w-[300px]">
                <TagsTrigger>
                  {selectedAmneties.map((amnety) => (
                    <TagsValue
                      key={amnety}
                      onRemove={() => {
                        // handleRemove("amnety", amnety),
                        onChange(handleRemove("amnety", amnety));
                      }}
                    >
                      {amneties.find((t) => t.id === amnety)?.label}
                    </TagsValue>
                  ))}
                </TagsTrigger>
                <TagsContent>
                  <TagsInput placeholder="Search amnety..." />
                  <TagsList>
                    <TagsEmpty />
                    <TagsGroup>
                      {amneties.map((amnety) => (
                        <TagsItem
                          key={amnety.id}
                          onSelect={() => {
                            // handleSelect("amnety", amnety.id),
                            onChange(handleSelect("amnety", amnety.id));
                          }}
                          value={amnety.id}
                        >
                          {amnety.label}
                          {selectedAmneties.includes(amnety.id) && (
                            <CheckIcon
                              className="text-muted-foreground"
                              size={14}
                            />
                          )}
                        </TagsItem>
                      ))}
                    </TagsGroup>
                  </TagsList>
                </TagsContent>
              </Tags>
            )}
          />
          {errors.amneties && errors.amneties.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Pick at least one amnety the castle offers
            </p>
          )}
        </div>

        <div>
          <h3>What events do you offer? (optional)</h3>
          <Controller
            name="events"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Tags className="max-w-[300px]">
                <TagsTrigger>
                  {selectedEvents.map((event) => (
                    <TagsValue
                      key={event}
                      onRemove={() => {
                        onChange(handleRemove("event", event));
                      }}
                    >
                      {events.find((t) => t.id === event)?.label}
                    </TagsValue>
                  ))}
                </TagsTrigger>
                <TagsContent>
                  <TagsInput placeholder="Search events..." />
                  <TagsList>
                    <TagsEmpty />
                    <TagsGroup>
                      {events.map((event) => (
                        <TagsItem
                          key={event.id}
                          onSelect={() => {
                            onChange(handleSelect("event", event.id));
                          }}
                          value={event.id}
                        >
                          {event.label}
                          {selectedEvents.includes(event.id) && (
                            <CheckIcon
                              className="text-muted-foreground"
                              size={14}
                            />
                          )}
                        </TagsItem>
                      ))}
                    </TagsGroup>
                  </TagsList>
                </TagsContent>
              </Tags>
            )}
          />
        </div>
        <div>
          <h3>Set house rules and cancellation policy</h3>
          <Controller
            name="rules"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Tags className="max-w-[300px]">
                <TagsTrigger>
                  {selectedRules.map((rule) => (
                    <TagsValue
                      key={rule}
                      onRemove={() => {
                        onChange(handleRemove("rule", rule));
                      }}
                    >
                      {rules.find((t) => t.id === rule)?.label}
                    </TagsValue>
                  ))}
                </TagsTrigger>
                <TagsContent>
                  <TagsInput placeholder="Pick a rule..." />
                  <TagsList>
                    <TagsEmpty />
                    <TagsGroup>
                      {rules.map((rule) => (
                        <TagsItem
                          key={rule.id}
                          onSelect={() => {
                            onChange(handleSelect("rule", rule.id));
                          }}
                          value={rule.id}
                        >
                          {rule.label}
                          {selectedRules.includes(rule.id) && (
                            <CheckIcon
                              className="text-muted-foreground"
                              size={14}
                            />
                          )}
                        </TagsItem>
                      ))}
                    </TagsGroup>
                  </TagsList>
                </TagsContent>
              </Tags>
            )}
          />
          {errors.rules && errors.rules.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Pick at least one house rule for the castle
            </p>
          )}
        </div>
        <div>
          <h3>Upload images of your castle</h3>
          <Controller
            name="images"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <input
                type="file"
                id="images"
                multiple
                onChange={(e) =>
                  onChange(
                    handleUpdateFileChange(e).then((result) => onChange(result))
                  )
                }
              />
            )}
          />
          {errors.images && errors.images.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Upload at least one image of your castle
            </p>
          )}
        </div>
        <p className="text-center text-lg mt-5">{formError}</p>
        <button type="submit">Submit listing</button>
      </form>
    </div>
  );
};
export default UpdateListingForm;
