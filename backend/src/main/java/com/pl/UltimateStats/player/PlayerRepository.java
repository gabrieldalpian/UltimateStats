package com.pl.UltimateStats.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {
    void deleteByName(String playerName);

    Optional<Player> findByName(String name);

    List<Player> findByTeamIgnoreCase(String team);

    List<Player> findByNameContainingIgnoreCase(String name);

    List<Player> findByPosIgnoreCase(String pos);

    List<Player> findByNationIgnoreCase(String nation);

    List<Player> findByTeamIgnoreCaseAndPosIgnoreCase(String team, String pos);
}
