package com.pl.UltimateStats.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeam(String teamName) {
        return playerRepository.findAll().stream()
                .filter(p -> p.getTeam() != null &&
                        p.getTeam().toLowerCase().contains(teamName.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findAll().stream()
                .filter(p -> p.getName() != null &&
                        p.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByPos(String position) {
        return playerRepository.findAll().stream()
                .filter(p -> p.getPos() != null &&
                        p.getPos().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByNation(String nation) {
        return playerRepository.findAll().stream()
                .filter(p -> p.getNation() != null &&
                        p.getNation().toLowerCase().contains(nation.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String team, String position) {
        return playerRepository.findAll().stream()
                .filter(p -> p.getTeam() != null && p.getTeam().toLowerCase().contains(team.toLowerCase()))
                .filter(p -> p.getPos() != null && p.getPos().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer) {
        return playerRepository.findByName(updatedPlayer.getName())
                .map(playerToUpdate -> {
                    playerToUpdate.setTeam(updatedPlayer.getTeam());
                    playerToUpdate.setPos(updatedPlayer.getPos());
                    playerToUpdate.setNation(updatedPlayer.getNation());
                    playerToUpdate.setAge(updatedPlayer.getAge());
                    playerToUpdate.setMp(updatedPlayer.getMp());
                    playerToUpdate.setStarts(updatedPlayer.getStarts());
                    playerToUpdate.setMin(updatedPlayer.getMin());
                    playerToUpdate.setGls(updatedPlayer.getGls());
                    playerToUpdate.setAst(updatedPlayer.getAst());
                    playerToUpdate.setPk(updatedPlayer.getPk());
                    playerToUpdate.setCrdy(updatedPlayer.getCrdy());
                    playerToUpdate.setCrdr(updatedPlayer.getCrdr());
                    playerToUpdate.setXg(updatedPlayer.getXg());
                    playerToUpdate.setXag(updatedPlayer.getXag());
                    playerRepository.save(playerToUpdate);
                    return playerToUpdate;
                })
                .orElse(null);
    }

    @Transactional
    public void deletePlayer(String playerName) {
        playerRepository.deleteByName(playerName);
    }
}

