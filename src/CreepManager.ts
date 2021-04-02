export class CreepManager {
  public run(): void {
    if (this.shouldSpawnHarvester("Harvester1")) {
      console.log("SPAWNING HARVESTER1");
      this.spawnHarvester("Spawn1", "Harvester1");
    }
  }

  private shouldSpawnHarvester(creepName: string): boolean {
    return !Game.creeps[creepName];
  }

  private spawnHarvester(spawnName: string, creepName: string): void {
    // Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );
    Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], creepName);
  }
}
