import React,{useState} from "react"
import { Button } from "@/components/ui/button"
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

const SUPPORTED_TRIGGERS = [
    { id: 'price-trigger', title: 'Price Trigger', description: 'Triggers when a specific price point is reached.' },
    { id: 'timer-trigger', title: 'Timer Trigger', description: 'Triggers at specified time intervals.' },
]


export function TriggerSheet({
    onSelect
}: {
    onSelect: (payload: { kind: string; metadata: any }) => void
}) {
    const [metadata, setMetadata] = useState<any>({});
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
                                    {SUPPORTED_TRIGGERS.map(({id,title}) => (
                                    <>
                                        <SelectItem
                                            key = {id}
                                            value={id}
                                        >
                                            {title}
                                        </SelectItem>
                                    </>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button onClick={() => {
                        onSelect({
                            kind: selectedTrigger,
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
