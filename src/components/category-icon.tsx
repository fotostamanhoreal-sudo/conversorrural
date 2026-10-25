import {
  ArrowDown,
  AudioWaveform,
  Beaker,
  Clock,
  Dumbbell,
  Fuel,
  Gauge,
  HardDrive,
  LandPlot,
  Plug,
  Ruler,
  Thermometer,
  Triangle,
  Weight,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/units";

const icons: Record<IconName, LucideIcon> = {
  ruler: Ruler,
  weight: Weight,
  thermometer: Thermometer,
  land: LandPlot,
  beaker: Beaker,
  gauge: Gauge,
  clock: Clock,
  pressure: ArrowDown,
  zap: Zap,
  plug: Plug,
  disk: HardDrive,
  angle: Triangle,
  wave: AudioWaveform,
  fuel: Fuel,
  force: Dumbbell,
  wheat: Wheat,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
