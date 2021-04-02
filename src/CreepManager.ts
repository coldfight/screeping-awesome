export class CreepManager {
  public run(): void {
    if (this.shouldSpawnHarvester("Harvester1")) {
      this.spawnHarvester("Spawn1", "Harvester1");
    }

    this.harvestEnergy("Harvester1");
  }

  private shouldSpawnHarvester(creepName: string): boolean {
    return !Game.creeps[creepName];
  }

  private spawnHarvester(spawnName: string, creepName: string): void {
    console.log(`> Spawning Harvester: ${creepName}`);
    Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], creepName);
  }

  private harvestEnergy(creepName: string): void {
    const creep = Game.creeps[creepName];
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      console.log(`> Moving '${creepName}' to source to harvest energy`);
      creep.moveTo(sources[0]);
    } else {
      console.log(`> '${creepName}' is harvesting energy`);
    }
  }
}
