from django.contrib import admin
from react_game_server.models import GameState, GameStateChoices


# Register your models here.
class GameStateChoicesInline(admin.TabularInline):
    model = GameStateChoices


class GameStateAdmin(admin.ModelAdmin):
    inlines = [GameStateChoicesInline, ]
    list_display = ('unique_id', 'choice_description', 'description')
    fields = ('unique_id', 'choice_description', 'description', ('function', 'condition'))


admin.site.register(GameState, GameStateAdmin)
