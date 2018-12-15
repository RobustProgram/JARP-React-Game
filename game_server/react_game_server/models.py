from django.db import models


# Create your models here.
class GameState(models.Model):
    unique_id = models.CharField(max_length=16, primary_key=True)
    choice_description = models.CharField(max_length=1000, blank=False)
    description = models.TextField(blank=False)
    function = models.TextField(blank=True)
    condition = models.TextField(blank=True)


class GameStateChoices(models.Model):
    game_state = models.ForeignKey(GameState, related_name='choices', on_delete=models.CASCADE)
    choice = models.CharField(max_length=16)

    def __str__(self):
        return "{}".format(self.choice)
