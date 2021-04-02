const HARVESTER_1 = "Harvester1";
const SPAWN_1 = "Spawn1";

export class CreepManager {
  public run(): void {
    const spawn = Game.spawns[SPAWN_1];

    if (this.shouldSpawnHarvester(HARVESTER_1)) {
      this.spawnHarvester(spawn, HARVESTER_1);
    }

    const creep = Game.creeps[HARVESTER_1];

    if (this.shouldTransferEnergyToSpawn(creep)) {
      this.transferEnergyToSpawn(spawn, creep);
    } else {
      this.harvestEnergy(creep);
    }
  }

  /**
   * Checks to see if the creep exists or not.
   *
   * @param creepName The name of the creep to check
   * @returns Whether or not the creep exists
   */
  private shouldSpawnHarvester(creepName: string): boolean {
    return !Game.creeps[creepName];
  }

  /**
   * Create a new harvester creep.
   *
   * @param spawn The spawn object to spawn a creep
   * @param creepName The name of the new screep you're creating
   */
  private spawnHarvester(spawn: StructureSpawn, creepName: string): void {
    console.log(`> Spawning Harvester: ${creepName}`);
    spawn.spawnCreep([WORK, CARRY, MOVE], creepName);
  }

  /**
   * If the creep is not in range of an energy source, it will move to it.
   * And if it is in range, it will harvest the source's energy.
   *
   * @param creep The harvester creep
   */
  private harvestEnergy(creep: Creep): void {
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      console.log(`> Moving '${creep.name}' to source to harvest energy`);
      creep.moveTo(sources[0]);
    } else {
      console.log(`> '${creep.name}' is harvesting energy`);
    }
  }

  /**
   * Checks to see if the creep is at max capacity, and returns whether or not it
   * should be returning to the spawn to transfer the harvested energy.
   *
   * @param creep The harvester creep
   * @returns
   */
  private shouldTransferEnergyToSpawn(creep: Creep): boolean {
    return creep.store.getFreeCapacity() <= 0;
  }

  /**
   * If the creep is not in range of the spawn structure, it will move
   * to it, otherwise it will transfer harvested energy to it.
   *
   * @param spawn The spawn structure to return to
   * @param creep The harvester creep
   */
  private transferEnergyToSpawn(spawn: StructureSpawn, creep: Creep): void {
    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      console.log(`> Moving '${creep.name}' to spawn '${spawn.name}'`);

      creep.moveTo(spawn);
    } else {
      console.log(`> '${creep.name}' transferring energy to to spawn '${spawn.name}'`);
    }
  }
}
