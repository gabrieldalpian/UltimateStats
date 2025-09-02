package com.pl.UltimateStats.player;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersByName(String name) {
        return name == null ? getPlayers() : playerRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Player> getPlayersByNation(String nation) {
        return nation == null ? getPlayers() : playerRepository.findByNationIgnoreCase(nation);
    }

    public List<Player> getPlayersByPos(String pos) {
        return pos == null ? getPlayers() : playerRepository.findByPosIgnoreCase(pos);
    }

    public List<Player> getPlayersByTeamId(Integer teamId) {
        return teamId == null ? getPlayers() : playerRepository.findByTeamId(teamId);
    }

    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Player updatedPlayer) {
        return playerRepository.findById(updatedPlayer.getId())
                .map(player -> {
                    player.setName(updatedPlayer.getName());
                    player.setNation(updatedPlayer.getNation());
                    player.setTeamId(updatedPlayer.getTeamId());
                    player.setPos(updatedPlayer.getPos());
                    return playerRepository.save(player);
                }).orElse(null);
    }

    @Transactional
    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}