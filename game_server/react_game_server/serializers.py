from rest_framework import serializers
from react_game_server.models import GameState


class GameStateSerializer(serializers.ModelSerializer):
    choices = serializers.StringRelatedField(many=True)

    class Meta:
        model = GameState
        fields = ('unique_id', 'choice_description', 'description', 'function', 'condition', 'choices')
