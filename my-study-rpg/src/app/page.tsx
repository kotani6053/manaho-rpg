import BattleScene from "@/components/BattleScene";
import Quiz from "@/components/Quiz";
import ActionPanel from "@/components/ActionPanel";

export default function Page() {
  return (
    <main className="p-4 space-y-4">
      <BattleScene />
      <Quiz />
      <ActionPanel />
    </main>
  );
}
