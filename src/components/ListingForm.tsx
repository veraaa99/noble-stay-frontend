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

type ListingFormProps = {
  setIsListingUpdated: Dispatch<SetStateAction<boolean>>;
};

const ListingForm = ({ setIsListingUpdated }: ListingFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ListingInputs>({
    defaultValues: {
      title: "",
      images: [],
      location: "",
      description: "",
      amneties: [],
      rules: [],
      dates: {},
      guests: [],
      rooms: [],
      events: [],
    },
  });

  const { token } = useUser();
  const { actions } = useCastleListing();

  const [formError, setFormError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [selectedAmneties, setSelectedAmneties] = useState<FilterOption[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<FilterOption[]>([]);
  const [selectedRules, setSelectedRules] = useState<FilterOption[]>([]);
  const selectedRooms: Room[] = [];

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

  useEffect(() => {
    if (isSubmitted) {
      reset({
        title: "",
        images: [],
        location: "",
        description: "",
        amneties: [],
        rules: [],
        dates: {},
        guests: [],
        rooms: [],
        events: [],
      });
      console.log("Castlelisting created!");
    }
    setIsSubmitted(false);
    setFormError("");
  }, [isSubmitted]);

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

  const handleRemove = (type: string, value: FilterOption) => {
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

  const handleSelect = (type: string, value: FilterOption) => {
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

    const newArray = allDatesInRange?.map((date) => {
      return format(date, "yyyy-MM-dd");
    });

    const dataToSubmit = { ...data, dates: newArray };

    try {
      const res = await axios.post("api/listings", dataToSubmit, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        actions.updateListings(res.data);
        setFormError("");
        setIsSubmitted(true);
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
                // selected={value}
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
                />
                <RoomCard
                  room={rooms[1]}
                  onChange={() => {
                    onChange(handleRoomsSelect(rooms[1]));
                  }} // send value to hook form
                  selected={rooms[1]}
                  isBookingRoom={false}
                />
                <RoomCard
                  room={rooms[2]}
                  onChange={() => {
                    onChange(handleRoomsSelect(rooms[2]));
                  }} // send value to hook form
                  selected={rooms[2]}
                  isBookingRoom={false}
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
                      key={amnety.id}
                      onRemove={() => {
                        onChange(handleRemove("amnety", amnety));
                      }}
                    >
                      {amneties.find((t) => t.id === amnety.id)?.label}
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
                            onChange(handleSelect("amnety", amnety));
                          }}
                          value={amnety.id}
                        >
                          {amnety.label}
                          {selectedAmneties.includes(amnety) && (
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
                      key={event.id}
                      onRemove={() => {
                        onChange(handleRemove("event", event));
                      }}
                    >
                      {events.find((t) => t.id === event.id)?.label}
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
                            onChange(handleSelect("event", event));
                          }}
                          value={event.id}
                        >
                          {event.label}
                          {selectedEvents.includes(event) && (
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
                      key={rule.id}
                      onRemove={() => {
                        onChange(handleRemove("rule", rule));
                      }}
                    >
                      {rules.find((t) => t.id === rule.id)?.label}
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
                            onChange(handleSelect("rule", rule));
                          }}
                          value={rule.id}
                        >
                          {rule.label}
                          {selectedRules.includes(rule) && (
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
                // value={this.state.images}
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
export default ListingForm;
