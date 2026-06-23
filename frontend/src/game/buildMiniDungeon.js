import { getChapters } from '../data/chapterContent.js';

export function buildMiniDungeon(selectedTopics, enemies, grade) {
  const chapters = getChapters(grade || 9);
  const bosses = enemies.filter(e => e.isBoss);
  const regular = enemies.filter(e => !e.isBoss);

  const numFloors = selectedTopics.length === 1 ? 2 : selectedTopics.length;

  return Array.from({ length: numFloors }, (_, i) => {
    const topic = selectedTopics.length === 1 ? selectedTopics[0] : selectedTopics[i];
    const chapter = chapters.find(c => c.id === topic);

    const topicEnemies = regular.filter(e => e.topic === topic);
    const pool = topicEnemies.length ? topicEnemies : regular;
    const e1 = pool[Math.floor(Math.random() * pool.length)];
    const e2 = pool[Math.floor(Math.random() * pool.length)];

    const isLast = i === numFloors - 1;
    const bossIdx = isLast ? bosses.length - 1 : Math.min(i, bosses.length - 2);
    const boss = bosses[Math.max(0, bossIdx)];

    return {
      id: i + 1,
      name: chapter ? `${chapter.icon} ${chapter.name}` : `Etaj ${i + 1}`,
      rooms: [
        { type: 'COMBAT', id: e1.id, icon: e1.sprite },
        { type: 'DOOR', topic, icon: '🚪' },
        { type: 'TREASURE', potions: 1, gold: 8 + 4 * i, icon: '💎' },
        { type: 'COMBAT', id: e2.id, icon: e2.sprite },
        { type: 'BOSS', id: boss.id, icon: '♛' },
      ],
    };
  });
}
