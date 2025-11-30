import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import type { PriceMetadata } from "@/lib/types";
import type { TimerMetadata } from "@/lib/types";
import { SUPPORTED_TRIGGERS, SUPPORTED_ASSETS } from "../lib/types";


export function TriggerSheet({
    onSelect
}: {
    onSelect: (payload: { type: string; metadata: any }) => void
}) {
    const [metadata, setMetadata] = useState<PriceMetadata | TimerMetadata>({
        time: 3600,
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        Choose the type of trigger you want to add to your workflow.
                        <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                                        <>
                                            <SelectItem
                                                key={id}
                                                value={id}
                                            >
                                                {title}
                                            </SelectItem>
                                        </>
                                    ))}
                                </SelectGroup>
                            </SelectContent>

                            {selectedTrigger === 'price-trigger' && (
                                <>
                                    <SelectGroup>
                                        <SelectLabel className="mt-4 mb-2">Asset</SelectLabel>
                                        <Select value={(metadata as PriceMetadata).asset} onValueChange={(value) => {
                                            setMetadata({
                                                ...(metadata as PriceMetadata),
                                                asset: value,
                                            })
                                        }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Asset" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {SUPPORTED_ASSETS.map(({ id, title }) => (
                                                        <SelectItem
                                                            key={id}
                                                            value={id}
                                                        >
                                                            {title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </SelectGroup>

                                    <SelectGroup>
                                        <Input
                                            className="mt-4"
                                            type="number"
                                            placeholder="Price"
                                            value={(metadata as PriceMetadata).price}
                                            onChange={(e) => {
                                                setMetadata({
                                                    ...(metadata as PriceMetadata),
                                                    price: Number(e.target.value),
                                                })
                                            }
                                            }
                                        />
                                    </SelectGroup>

                                    <SelectGroup>
                                        <Input
                                            className="mt-4"
                                            type="number"
                                            placeholder="Decimals"
                                            value={(metadata as PriceMetadata).decimals}
                                            onChange={(e) => {
                                                setMetadata({
                                                    ...(metadata as PriceMetadata),
                                                    decimals: Number(e.target.value),
                                                })
                                            }
                                            }
                                        />
                                    </SelectGroup>
                                </>
                            )}

                        </Select>
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button onClick={() => {
                        onSelect({
                            type: selectedTrigger,
                            metadata,
                        })
                    }}>Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
