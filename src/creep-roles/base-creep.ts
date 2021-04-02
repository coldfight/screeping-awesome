export abstract class BaseCreep {
  protected creep: Creep;
  protected spawn: StructureSpawn;

  constructor(spawn: StructureSpawn, creep: Creep) {
    this.spawn = spawn;
    this.creep = creep;
  }
  public abstract run(): void;
}
