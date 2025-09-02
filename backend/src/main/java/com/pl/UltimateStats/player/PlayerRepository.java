package com.pl.UltimateStats.player;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByNameContainingIgnoreCase(String name);
    List<Player> findByPosIgnoreCase(String pos);
    List<Player> findByNationIgnoreCase(String nation);
    List<Player> findByTeamId(Integer teamId);
}