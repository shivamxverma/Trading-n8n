import { useState } from "react"
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
import { SUPPORTED_ASSETS } from "../../../../packages/common/metadata";
import type { TradingMetadata } from "../../../../packages/common/metadata";
import { SUPPORTED_ACTIONS } from "../../../../packages/common/metadata";


export function ActionSheet({
    onSelect
}: {
    onSelect: (payload: { type: string; metadata: TradingMetadata }) => void
}) {
    const [metadata, setMetadata] = useState<Partial<TradingMetadata & { qty?: number }>>({});
    const [selectedActions, setSelectedActions] = useState<string>('');

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
                        <Select value={selectedActions} onValueChange={(value) => setSelectedActions(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_ACTIONS.map(({ id, title }) => (
                                        <SelectItem
                                            key={id}
                                            value={id}
                                        >
                                            {title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>

                            {(selectedActions === 'hyperliquid' || selectedActions === 'lighter' || selectedActions === 'backpack') && (
                                <>
                                    <div className="pt-4">
                                        Type
                                    </div>
                                      
                                    <Select value={metadata?.type ?? ""} onValueChange={(value) => setMetadata(prev => ({
                                        ...prev,
                                        type: value
                                      }))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value={"LONG"}>LONG</SelectItem>
                                                <SelectItem value={"SHORT"}>SHORT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>

                                    </Select>

                                    <div className="pt-4">
                                        Symbol
                                    </div>

                                    <Select value={metadata?.symbol ?? ""} onValueChange={(value) => setMetadata(prev => ({
                                        ...prev,
                                        symbol: value
                                      }))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Asset" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {SUPPORTED_ASSETS.map(asset => (
                                                    <SelectItem
                                                        key={asset.id}
                                                        value={asset.id}
                                                    >
                                                        {asset.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>

                                      </Select>

                                    <div className="pt-4">
                                        Qty
                                    </div>

                                    <Input
                                        className="mt-4"
                                        type="number"
                                        placeholder="Amount"
                                        value={metadata?.qty != null ? metadata.qty.toString() : ''}
                                        onChange={(e) => setMetadata(prev => ({
                                            ...prev,
                                            qty: Number(e.target.value)
                                        }))}
                                    />
                                </>
                            )}

                        </Select>
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button onClick={() => {
                        onSelect({
                            type: selectedActions,
                            metadata: metadata as TradingMetadata,
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
